export const postsQuery = `*[_type == "post" && defined(slug.current)]`
export const locationsQuery = `*[_type == "location" && defined(slug.current)]`

export const postQuery = `*[_type == "post" && slug.current == $slug][0]`
export const locationQuery = `*[_type == "location" && slug.current == $slug][0]`