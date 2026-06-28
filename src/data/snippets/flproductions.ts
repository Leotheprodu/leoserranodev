import type { Snippet } from './index';

export const snippets: Snippet[] = [
  {
    id: 'flp-sync-listener',
    project: 'flproductions',
    title: 'Unified real-time sync — the single source of truth',
    description:
      'Service emits a domain event → SyncListener handles fan-out to WebSocket rooms. The same map drives every cache invalidation in the app. 41 @OnEvent handlers, all try/catch, multi-room broadcast.',
    file: 'server/src/sync/sync.listener.ts',
    language: 'typescript',
    featured: true,
    tags: ['real-time', 'event-driven', 'socket.io', 'eventemitter2'],
    order: 1,
    highlights: [
      'Service never calls socket.to().emit() directly — emits a domain event instead',
      'Each handler wraps in try/catch so sync failure never compromises a DB transaction',
      'Same handler routes to multiple rooms (project room + client room + admin room)',
    ],
    code: `@OnEvent('project.updated')
handleProjectUpdated(payload: {
  projectId: number;
  clientId: number;
  title: string;
  status: string;
}) {
  try {
    this.logger.log(\`🔄 Syncing project \${payload.projectId}: \${payload.status}\`);

    // Notify the project room (admin / uploader in detail view)
    this.assetsGateway.server
      .to(\`project_\${payload.projectId}\`)
      .emit('dashboard_sync', {
        type: 'project_updated',
        projectId: payload.projectId,
        status: payload.status,
        projectTitle: payload.title,
      });

    // Notify the client (portal dashboard)
    this.assetsGateway.emitToClient(
      payload.clientId,
      'dashboard_sync',
      {
        type: 'project_updated',
        projectId: payload.projectId,
        projectTitle: payload.title,
        status: payload.status,
      }
    );
  } catch (error) {
    const err = error as Error;
    this.logger.error(
      \`Error in handleProjectUpdated: \${err.message}\`,
      err.stack
    );
  }
}`,
  },
  {
    id: 'flp-use-sync',
    project: 'flproductions',
    title: 'useSync — the React Query invalidation dispatcher',
    description:
      'One hook, one map: 38 socket events → 18 sync groups → 40+ query keys. Mount in any page, receive every relevant real-time event for that scope.',
    file: 'app-new/src/global/hooks/socket/useSync.ts',
    language: 'typescript',
    featured: true,
    tags: ['real-time', 'react-query', 'socket.io'],
    order: 2,
    code: `export const useSync = (currentProjectId?: number | string) => {
  const socket = useSocketConnection();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket) return;
    const listeners: Record<string, (p: SocketEventPayload) => void> = {};

    Object.keys(SOCKET_EVENT_MAPPING).forEach((event) => {
      const handler = (payload: SocketEventPayload) => {
        const groups = SOCKET_EVENT_MAPPING[event];
        const eventProjectId =
          payload?.projectId ||
          payload?.data?.projectId ||
          payload?.data?.id;

        groups.forEach((group) => {
          const queryKeys = GROUP_MAPPING[group];
          const shouldForceRefetch = FORCE_REFETCH_GROUPS.includes(group);

          queryKeys.forEach((key) => {
            const isGlobalKey =
              key === 'PortalDashboard' || key === 'Projects';
            const isGlobalGroup =
              group === 'PROJECTS' || group === 'FINANCE';

            if (isGlobalKey || isGlobalGroup) {
              shouldForceRefetch
                ? queryClient.refetchQueries({
                    queryKey: [key],
                    type: 'active',
                  })
                : queryClient.invalidateQueries({
                    queryKey: [key],
                    refetchType: 'all',
                  });
            } else if (
              currentProjectId &&
              eventProjectId &&
              String(eventProjectId) === String(currentProjectId)
            ) {
              // Project-scoped invalidation
              queryClient.invalidateQueries({
                queryKey: [key, currentProjectId],
                refetchType: 'all',
              });
            }
          });
        });
      };

      socket.on(event, handler);
      listeners[event] = handler;
    });

    return () => {
      Object.keys(listeners).forEach((e) =>
        socket.off(e, listeners[e])
      );
    };
  }, [socket, queryClient, currentProjectId]);
};`,
  },
  {
    id: 'flp-deny-default',
    project: 'flproductions',
    title: 'Deny-by-default permissions guard',
    description:
      'Every route must declare @CheckLoginStatus or the guard throws 403. "I forgot to add auth" becomes a compile-time-feeling error.',
    file: 'server/src/auth/guards/permissions/permissions.guard.ts',
    language: 'typescript',
    tags: ['security', 'nestjs', 'guards', 'patterns'],
    order: 3,
    code: `if (!checkLoginStatus) {
  this.logger.error(
    \`[PermissionsGuard] Security Violation: \` +
      \`Missing @CheckLoginStatus in \` +
      \`\${context.getClass().name}.\${context.getHandler().name}\`
  );
  throw new ForbiddenException(
    'Access Denied: Missing mandatory @CheckLoginStatus ' +
      'decorator (Deny by Default)'
  );
}`,
  },
  {
    id: 'flp-wallet-cashback',
    project: 'flproductions',
    title: 'Wallet cashback in a single Prisma transaction',
    description:
      '5% cashback on net amount, Math.floor-rounded, atomic with wallet_transactions log. The same service handles VIP permanent unlock on the vault.',
    file: 'server/src/wallet/wallet.service.ts',
    language: 'typescript',
    tags: ['prisma', 'transactions', 'finance', 'atomicity'],
    order: 4,
    code: `async addCashback(
  userId: number,
  amount: number,
  paymentId: number,
  description: string
) {
  const cashback = Math.floor(amount * 0.05);
  if (cashback <= 0) return;

  return await this.prisma.$transaction(async (tx) => {
    const user = await tx.users.update({
      where: { id: userId },
      data: { balance: { increment: cashback } },
    });

    await tx.wallet_transactions.create({
      data: {
        userId,
        amount: cashback,
        type: WalletTransactionType.CASHBACK,
        description,
        metadata: { paymentId, originalAmount: amount },
      },
    });

    // Real-time dispatch to all connected devices
    this.eventEmitter.emit('wallet.updated', {
      userId,
      balance: user.balance,
    });

    return user;
  });
}`,
  },
  {
    id: 'flp-post-data',
    project: 'flproductions',
    title: 'PostData with declarative cache invalidation',
    description:
      'The rule (enforced in code review): socket.on in components is PROHIBITED; queryClient.invalidateQueries in hooks is PROHIBITED. The only sanctioned way is PostData({ invalidates: ["GROUP"] }) — keeping HTTP and socket invalidation in lockstep.',
    file: 'app-new/src/global/services/HandleAPI.ts',
    language: 'typescript',
    tags: ['react-query', 'api', 'patterns'],
    order: 5,
    code: `export const PostData = <TResponse, TData = undefined>({
  key,
  url,
  method = 'POST',
  isFormData,
  skipAuth = false,
  invalidates,
  transformBody,
}): UseMutationResult<TResponse, Error, TData, unknown> => {
  const queryClient = useQueryClient();
  return useMutation<TResponse, Error, TData, unknown>({
    mutationKey: [key],
    mutationFn: async (data: TData) => {
      const finalUrl = typeof url === 'function' ? url(data) : data;
      const body = transformBody ? transformBody(data) : data;
      return await fetchAPI<TResponse>({
        url: finalUrl,
        method,
        body,
        isFormData,
        skipAuth,
      });
    },
    onSuccess: () => {
      if (invalidates && invalidates.length > 0) {
        invalidates.forEach((group) => {
          const keys = GROUP_MAPPING[group];
          keys?.forEach((queryKey) => {
            queryClient.invalidateQueries({
              queryKey: [queryKey],
              exact: false,
              refetchType: 'all',
            });
          });
        });
      }
    },
  });
};`,
  },
];
