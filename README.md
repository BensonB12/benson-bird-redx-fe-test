## Tasks Done In Order

- Downloaded bootstrap and sass for quick styling
- Changed Colors so my eyes don't hurt looking at it
- Implement custom colors, fonts, and logo
- Make it mobile friendly
- Give shadows to buttons, inner shadows to non-clickable
- Create Interfaces
- Refactor types, pages, components
- Debouncing the search
- Browser caching
- Server caching
- I tried and tried to use 'useFetcher' and 'userLoaderData', but I was not able to figure it out. I understand the concept and moving logic to the server with the fetcher.
- Ordered by most recently updated date, not creation date

## Tasks I would do with more time (in order-ish)

- Using 'useFetcher' and 'useLoaderData' for optimal performance and to take advantage of React Router V7
- Using 'suspense'. I am familiar with it in 'suspenseQueries' but not quite confident to utilize it well here. I need more research/time to implement the 'suspense' advantages of React Router V7
- Using pagination. It would help scalability and efficiency a TON. It was on my list, but I am confident on how to do it, how I would change both the api query, user input, and my hooks/services. I have done it before.
- Tests. Both unit and integration tests are the next thing. I think they are very important, but because no where did it mention tests, and tests do take up a good chunk of time... I chose pagination over them.
- Rate limiting. I would have use LRUCache to keep track of IP's and then turned them away if they broke our limit
- Let the users filter by: updated after _Date input here_
- Create a form to edit users. I initially had this idea when making each user a card that is clickable (they are just links to email them) and I would use zod and conform to make it quicker and easier. Ultimately I would have spent a lot of time creating endpoints, and I was having a lot of fun learning/enhancing my UX/UI skills.
  - The form would look like a pencil icon they would click, and it would pop out into a modal
- Maybe changing the 'user' variable names to 'lead' because the audience is looking at these as 'leads'. I decided not to change to leads in the dev mode because attribute wise — they are more of users. I also look at this like I am working on code attached to more, and the highest dictator would be consistency throughout.
- As seen in comments, I also didn't do caching that tells the client what the server is caching
- Skipped Redis, it would be awesome scalability wise, making distributed systems very happy and sharing cache, but that is too big for the time I have
