import { defineConfig } from 'tinacms'

  // Your hosting provider likely exposes this as an environment variable
  const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || 'main'
  
  export default defineConfig({
    branch,
    clientId: null, // Get this from tina.io
    token: null, // Get this from tina.io
    build: {
      outputFolder: 'admin',
      publicFolder: 'public',
    },
    media: {
      tina: {
        mediaRoot: 'uploads',
        publicFolder: 'public',
      },
    },
    schema: {
      collections: [
        {
          label: 'Posts',
          name: 'post',
          path: 'posts',
          fields: [
            {
              type: 'string',
              label: 'Title',
              name: 'title',
              isTitle: true,
              required: true,
            },
            {
              type: 'string',
              label: 'Author',
              name: 'author',
            },
            {
              type: 'datetime',
              label: 'Date',
              name: 'date',
            },
            {
              type: 'string',
              label: 'Image',
              name: 'hero_image',
            },
            {
              type: 'rich-text',
              label: 'Body',
              name: 'body',
              isBody: true,
            },
          ],
        },
      ],
    },
  })
  