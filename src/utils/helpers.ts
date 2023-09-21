export function generateSlug(categoty: string) {
    return categoty
        .toString()
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
}

export function generateCategoryData(categories) {
    let categoryData: { name: string; slug: string }[] = [];

    categories.forEach((category) => {
        categoryData.push({
            name: category,
            slug: `${generateSlug(category)}`,
        });
    });
    return categoryData;
}
export function generateCategoriesFormat(categories) {
    let categoryData: string[] = [];

    categories.forEach((category) => {
        categoryData.push(generateSlug(category));
    });
    return categoryData;
}
