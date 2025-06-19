# Decisions & Thoughts Behind Benson Bird's test

## Requirement Gathering

### 1. **Audience & Users**

**Q: Who are the primary users of the full stack test?**  
**A:** The audience is any external users — the users we are displaying are leads

**Q: Will users need to update user information on this dashboard?**  
**A:** The ratio is approximately 100:1 for reads to writes on the user table

**Q: How often will users access this on a phone vs. a computer?**  
**A:** 60% desktop, 40% mobile

**Q: Is the "updated at" information important to the users?**  
**A:** Yes, the “updated at” info is very important

**Q: What is the typical age range of the users?**  
**A:** The age range is varied

---

### 2. **Company Context**

**Q: Which company is creating this interface?**  
**A:** The company is REDX

**Q: Is there a main logo or color scheme for the company?**  
**A:** Yes, the logo and color scheme are available at [REDX.com](https://www.redx.com). You can use the favicon

**Q: What is the main goal of the search feature?**  
**A:** The feature is for users to search for leads

**Q: Is there a specific product the company is known for or sells?**  
**A:** Real estate leads, though it’s not necessary to focus on that
**Q: If the updatedAt field is important, do we actually need to track a full history of update timestamps, or is the most recent update all that really matters to users?**
**A:** We're only concerned with the latest updatedAt value

---

### 3. **Feedback & Documentation**

**Q: How detailed should comments about changes be?**  
**A:** As detailed as you'd like — focus on high-level implementation. Don't spend more than ~3 hours. Also include what you'd do if you had more time, based on the exercise description.

## Starting list of things todo

_(mb) = Mentioned Before in a previous list_  
_(nt) = I don't actually anticipate implementing this, but I would if given enough time, or I thought it was a higher importance for this test/dem_

### TypeScript best practices

- Always use explicit typing
- Implement Vitest unit tests
- Implement Vitest integration tests
- Follow hook rules of course
- Avoid inline CSS
- Follow Typescript / React Router folder patterns

### React performance and patterns

- Know when to do server side logic v.s. client side logic
- Debouncing search inputs
- Rate limiting

### User experience and interface design

- Change colors
  - Colors do not mess well together
  - Overall horrible to the eyes
  - Don't have enough contrast between text and background
  - Utilize company colors and logo (Defaulting to favicon.ico)
- Remove developer focused text (API - Client search... ect)
- Import free Google font for overall design (Title font and default font)
- Don't use a table to display data
- Don't use absolute Black or absolute White
- Icons
- Utilize Bootstrap or modules to avoid global css
- Use URL params to people can refresh without losing their filter, and so they can send links to others
- Specific searches
  - First name
  - Last name
  - Email
  - updatedAt
  - CreatedAt

### Accessibility and responsive design

- Have larger text (minimum is 16px), especially if the audience is older
- Use semantic HTML elements instead of 'div'
- Aria attributes

### Responsive design

- Mobile Friendly
  - Create cards of users when in 'small'

### Scalability for larger datasets

- Caching
  - Primsa does not support query caching natively, so I can use something to make it so it does
  - Redis
  - Server side
  - Browser side
- Debouncing (_mb_)

### Performance optimization

- Optimal SQL queries
- Caching (_mb_)

### Code organization and maintainability

- Explicit types (_mb_)
  - Zod and Conform are good tools to utilize
- Tests (_mb_)

### Database enhancements

- Add an id/index to each row
- The name: 'updatedAt' is not clear

  There should be a one to many relation between 'user' and 'updatedAt' (Therefore creating another table)

  _or_

  The name 'updatedAt' should be renamed 'updatedLastAt'

### Implement Search Engine Optimizations (_nt_)

- Find Key words and Long Trailing Key Phrases to implement (_nt_)
- Be the source that people link to (_nt_)
- Put in links to other pages that help this page (_nt_)
  - Cookie crumbs (_nt_)
  - Links to other pages we have on the site that is reasonably connected to this page (_nt_)

## Tasks In Order

- Downloaded bootstrap and sass for quick styling
- Changed Colors so my eyes don't hurt looking at it
- Implement custom colors, fonts, and logo
- Make it mobile friendly
- Give shadows to buttons, inner shadows to non-clickable
- Create Interfaces
- Refactor types, pages, components
- Debouncing the search
