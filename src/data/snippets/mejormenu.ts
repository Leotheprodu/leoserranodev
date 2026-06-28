import type { Snippet } from './index';

export const snippets: Snippet[] = [
  {
    id: 'mm-catch-handle',
    project: 'mejormenu',
    title: 'catchHandle — the 41-line pattern that shaped every controller',
    description:
      'Converts Prisma errors, validation errors, and HttpException into uniform HTTP responses. Every controller in the codebase has the same clean shape because of this one util.',
    file: 'server-mejormenu/src/chore/utils/catchHandle.ts',
    language: 'typescript',
    featured: true,
    tags: ['nestjs', 'error-handling', 'patterns'],
    order: 12,
    code: `export const catchHandle = (e: unknown): never => {
  console.error(e);

  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
  }

  if (e instanceof Prisma.PrismaClientValidationError) {
    throw new HttpException('Data Validation Error', HttpStatus.BAD_REQUEST);
  }

  if (e instanceof HttpException) {
    const response = e.getResponse();
    if (typeof response === 'object' && response !== null) {
      const msg = (response as HttpExceptionResponse).message;
      if (typeof msg === 'string') {
        throw new HttpException(msg, e.getStatus());
      }
    }
    throw new HttpException(
      typeof response === 'string' ? response : 'Internal server error',
      e.getStatus()
    );
  }

  throw new HttpException(
    'Internal server error',
    HttpStatus.INTERNAL_SERVER_ERROR
  );
};`,
  },
  {
    id: 'mm-decorators',
    project: 'mejormenu',
    title: 'Custom decorators — 16 lines, three orthogonal concerns',
    description:
      '@CheckLoginStatus, @AppRole, @CheckUserId — every route declares its auth requirements as metadata. The PermissionsGuard reads them with Reflector and runs pure handlers.',
    file: 'server-mejormenu/src/auth/decorators/permissions.decorators.ts',
    language: 'typescript',
    tags: ['nestjs', 'decorators', 'patterns', 'metadata'],
    order: 13,
    code: `export const CHECK_USER_ID_KEY = 'checkUserId';
export type CheckUserIdType = string;
export const CheckUserId = (param: CheckUserIdType) =>
  SetMetadata(CHECK_USER_ID_KEY, param);

export const CHECK_LOGIN_STATUS = 'checkLoginStatus';
export type CheckLoginStatusType = 'loggedIn' | 'notLoggedIn' | 'public';
export const CheckLoginStatus = (condition: CheckLoginStatusType) =>
  SetMetadata(CHECK_LOGIN_STATUS, condition);

export const APP_ROLE_KEY = 'appRoles';
export type AppRoleType = number[];
export const AppRole = (...roles: AppRoleType) => SetMetadata(APP_ROLE_KEY, roles);`,
  },
  {
    id: 'mm-post-data',
    project: 'mejormenu',
    title: 'PostData — the whole data-fetching story in 1 function',
    description:
      'Single mutation wrapper. Pass invalidates: ["GROUP"] and the SYNC_GROUPS registry does the rest. Same source of truth for HTTP and WebSocket cache invalidation.',
    file: 'app-mejormenu/src/global/services/HandleAPI.ts',
    language: 'typescript',
    tags: ['react-query', 'api', 'patterns', 'cache'],
    order: 14,
    code: `export const PostData = <TResponse, TData = undefined>({
  key,
  url,
  method = 'POST',
  isFormData,
  skipAuth = false,
  invalidates,
  transformBody,
}) => {
  const queryClient = useQueryClient();
  return useMutation<TResponse, Error, TData>({
    mutationKey: [key],
    mutationFn: async (data: TData) => {
      const finalUrl = typeof url === 'function' ? url(data) : url;
      const body = transformBody ? transformBody(data) : data;
      return await fetchAPI<TResponse>({
        url: finalUrl,
        method,
        body: (body as FormData | null) ?? undefined,
        isFormData,
        skipAuth,
      });
    },
    onSuccess: () => {
      if (invalidates && invalidates.length > 0) {
        invalidates.forEach((group) => {
          const keys = GROUP_MAPPING[group];
          if (keys) {
            keys.forEach((queryKey) => {
              queryClient.invalidateQueries({
                queryKey: [queryKey],
                exact: false,
                refetchType: 'all',
              });
            });
          } else {
            console.warn(\`[HandleAPI] Invalid sync group: \${group}\`);
          }
        });
      }
    },
  });
};`,
  },
  {
    id: 'mm-socket-sync',
    project: 'mejormenu',
    title: 'useSocketSync — WebSocket → TanStack Query dispatcher',
    description:
      'When a socket event arrives, every queryKey in GROUP_MAPPING[group] gets invalidated. Mounted in the dashboard layout via a 10-line component, every page in the dashboard receives the right invalidations.',
    file: 'app-mejormenu/src/global/hooks/useSocketSync.ts',
    language: 'typescript',
    tags: ['real-time', 'react-query', 'socket.io'],
    order: 15,
    code: `export function useSocketSync(businessId: number | undefined) {
  const queryClient = useQueryClient();
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!businessId || !Server1API) return;
    const baseUrl = Server1API.replace(/\\/+$/, '');
    const socket = io(baseUrl, {
      auth: (cb) => {
        const t = getTokens();
        cb({ token: t?.accessToken || '' });
      },
      transports: ['websocket', 'polling'],
    });
    socketRef.current = socket;

    socket.on('connect_error', (err) =>
      console.warn('[SocketSync] Error:', err.message)
    );

    for (const [event, groups] of Object.entries(SOCKET_EVENT_MAPPING)) {
      socket.on(event, () => {
        for (const group of groups) {
          const keys = GROUP_MAPPING[group];
          if (keys) {
            for (const key of keys) {
              queryClient.invalidateQueries({
                queryKey: [key],
                exact: false,
                refetchType: 'all',
              });
            }
          }
        }
      });
    }

    return () => { socket.disconnect(); };
  }, [businessId, queryClient]);
}`,
  },
  {
    id: 'mm-schedule',
    project: 'mejormenu',
    title: 'Timezone-aware business hours (Intl.DateTimeFormat)',
    description:
      'isOpenNow, closesAt, nextOpenAt, hasSchedule — computed in any IANA timezone. The same logic runs server and client, kept in sync.',
    file: 'server-mejormenu/src/business-hours/schedule.util.ts',
    language: 'typescript',
    tags: ['timezone', 'utility', 'business-logic'],
    order: 16,
    code: `export function computeScheduleStatus(
  schedule: ScheduleInput[] | null | undefined,
  timezone: string,
  now: Date = new Date()
): ScheduleStatus {
  if (!schedule || schedule.length === 0) {
    return { isOpenNow: true, closesAt: null, nextOpenAt: null, hasSchedule: false };
  }

  const today = dayInTimezone(now, timezone);
  const nowMin = minutesInTimezone(now, timezone);
  const todayEntry = schedule.find((s) => s.dayOfWeek === today);

  if (todayEntry?.isActive && todayEntry.openTime && todayEntry.closeTime) {
    const open = toMinutes(todayEntry.openTime);
    const close = toMinutes(todayEntry.closeTime);
    if (nowMin >= open && nowMin < close) {
      return {
        isOpenNow: true,
        closesAt: buildDateInTimezone(now, today, close, timezone),
        nextOpenAt: null,
        hasSchedule: true,
      };
    }
  }

  for (let offset = 0; offset < 7; offset += 1) {
    const day = (today + offset) % 7;
    const entry = schedule.find((s) => s.dayOfWeek === day);
    if (entry?.isActive && entry.openTime && entry.closeTime) {
      const open = toMinutes(entry.openTime);
      if (offset === 0) { if (nowMin >= open) continue; }
      return {
        isOpenNow: false,
        closesAt: null,
        nextOpenAt: buildDateInTimezone(now, day, open, timezone),
        hasSchedule: true,
      };
    }
  }
  return { isOpenNow: false, closesAt: null, nextOpenAt: null, hasSchedule: true };
}`,
  },
  {
    id: 'mm-bulk-create',
    project: 'mejormenu',
    title: 'Bulk menu import from plain text',
    description:
      'Restaurant owner pastes a text block, service parses Categoria | item | price | desc into categories + items in a single transaction.',
    file: 'server-mejormenu/src/menu-items/menu-items.service.ts',
    language: 'typescript',
    tags: ['parser', 'prisma', 'transactions', 'dx'],
    order: 17,
    code: `async bulkCreate(businessId: number, raw: string) {
  const parsed = this.parseBulkText(raw);
  if (parsed.length === 0)
    return { total: 0, created: 0, errors: ['No items found in text'] };

  const errors: string[] = [];
  let created = 0;

  await this.prisma.$transaction(async (tx) => {
    let menu = await tx.menus.findFirst({
      where: { businessId },
      orderBy: { createdAt: 'asc' },
    });
    if (!menu) {
      menu = await tx.menus.create({
        data: { name: 'Menu General', businessId },
      });
    }

    const categoryCache = new Map<string, number>();
    for (const group of parsed) {
      let categoryId = categoryCache.get(group.categoryName);
      if (!categoryId) {
        let cat = await tx.categories.findFirst({
          where: { menuId: menu.id, name: group.categoryName },
        });
        if (!cat) {
          cat = await tx.categories.create({
            data: { name: group.categoryName, menuId: menu.id },
          });
        }
        categoryId = cat.id;
        categoryCache.set(group.categoryName, categoryId);
      }
      for (const item of group.items) {
        try {
          await tx.menu_items.create({
            data: {
              name: item.name,
              description: item.description,
              price: item.price,
              item_categories: { create: { categoryId } },
            },
          });
          created++;
        } catch (e: unknown) {
          errors.push(
            \`\${group.categoryName} / \${item.name}: \${(e as Error).message}\`
          );
        }
      }
    }
  });

  return {
    total: parsed.reduce((s, g) => s + g.items.length, 0),
    created,
    errors,
  };
}`,
  },
];
