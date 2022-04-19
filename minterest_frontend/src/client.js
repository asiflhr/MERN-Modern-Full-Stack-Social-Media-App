import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = sanityClient({
    projectId: 'minterest-2jx8j',
    dataset: 'production',
    apiVersion: '2021-11-16',
    useCdn: true,
    token: '',
})

const builder = imageUrlBuilder(client)

export const urlFor = (source) => {
    return builder.image(source)
}