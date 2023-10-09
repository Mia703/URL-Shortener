# Project Description: URL Shortening Landing Page

## Learning Outcomes

Learn how to send HTTP requests and integrate with a thrid-party API. This project is also good to introduce you to JS libraries and/or frameworks like React or Vue. If the user refreshes the browser, try using localStorage to save the list of shortened links.

## Skills Required

HTML, CSS, JS, API

## Features Required

Users can do the following:

- See the site's optimal layout based on their device's screen size -- Done
- Reduce the length of any valid URL -- Done
- Even after refreshing the browser, can see a list of shortened links -- Done
- With a single click can copy the shortened link to the clipboard
- When submitting the form, will get an error message if: The input field is currently empty

## Information References

- Reference the XXX.png to see the style and style requirements of this project.
- Utilise the following API: [URL Shortener API](https://www.npmjs.com/package/@studiohyperdrive/shortener)
- Learn how to use localStorage here: [How to use localStorage](https://blog.logrocket.com/localstorage-javascript-complete-guide/#what-localstorage-javascript)

### What I learned

- The importance of react "useState" to display JS variables
- Adding 'use client' in JS files
- Using npm node modules
- Understanding the short version of if, else statements
- How to prevent buttons other than the submit button to submit a form: https://stackoverflow.com/questions/932653/how-to-prevent-buttons-from-submitting-forms
- How DIFFICULT it is to copy to clipboard: https://www.w3schools.com/howto/howto_js_copy_clipboard.asp
- Using sessionStorage instead of localStorage, but they have the same functions: https://www.digitalocean.com/community/tutorials/js-introduction-localstorage-sessionstorage
- There is a problem deploying the page with sessonStorage enabled, reference: 
  - [How to use local or session storage in next js](https://stackoverflow.com/questions/66009011/how-to-use-local-or-session-storages-in-next-js)
  - [Browser APIs](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
  - need to safely access these APIs only when the browser is running

# Next.js Information

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
