# Partial Hydration with Vue

## Introduction
Assume you already know what SSR, universal app, hydration mean, you probably know why sometimes they are preferred over SPA. With Nuxt or just Vue SSR, there is already a pretty mature ecosystem to build universal app. However, almost all guides assume you have the chance to start from fresh. In reality, "rebuilding" is sometimes a terrifying word and maybe there isn't a possibility for rebuilding outdated system. For instance, the web server infrastructure is locked into some non-Node ecosystem.

This project is to expriment with partial hydration with Vue SSR, meaning using Vue to only SSR part of the page, and hydrate exactly that region to enable regional interactivity. With this approach, there is no "rebuilding" or "migration to Node ecosystem" and functionalities on the webpage may be replaced gradually.

## Technical Details

**If you have not read through the [Vue SSR guide](https://ssr.vuejs.org/#what-is-server-side-rendering-ssr), you want to do it before proceeding**

Vue SSR guide assumes the entire web page is one Vue instance. However, if we want partial hydration, it implicates there are maybe multiple Vue instances, even multiple same Vue route level components rendered on the page. Thus there are some tweaks needed to make it work.

### Mounting point
Normally there is one fixed mounting point like `<div id="app"/>`. Here we need multiple mounting points with unique ids.

### Router
With whole web page as one Vue instance, and router control the browser path. Here, because Vue instances live purely inside of a page, their vue routers cannot be `hash` or `history` mode. They have to be `abstract` mode so they don't distrupt browser path.

### Store
Each vue instance should have its own Vuex store instance and the same goes for router instances.

With all tweaks above, our Vue SSR server becomes a rendering engine instead of a true web server. And the real web server could call our Vue SSR server to render section of page. 

Take below scenario as an example:

There exists a huge Java spring MVC web server traditionally using JSP to for SSR. Now, replace some of the JSP rendering with this Vue SSR rendering server. The Java spring MVC web server is still there, `M` and `C` parts are untouched, some of the `V` is now replaced with new approach.

## Demo
run below commands to start demo, then go to `http://localhost:8081`

```
npm run build && npm run start:demo
```

The Vue SSR renderer server runs on port `8080`.

The mock legacy server runs on port `8081`, it simulates the scenario mentioned above.

```js
server.get('/', async (req, res) => {
  const [fooHtml, fooHtml2, barHtml] = await Promise.all([
    axios.get('http://localhost:8080/foo'),
    axios.post('http://localhost:8080/foo', {
      isBgBlue: true
    }),
    axios.get('http://localhost:8080/bar')
  ])
  res.send(`
  <!DOCTYPE html>
  <html>
    <h1>MOCK LEGACY SERVER MAIN PAGE</h1>
    <h2>This is some legacy content on the page</h2>
    <div>
      <h2>Foo component</h2>
      ${fooHtml.data}
    </div>
    <div>
      <h2>Second Foo component with bg color initially set to blue</h2>
      ${fooHtml2.data}
    </div>
    <div>
      <h2>Bar component</h2>
      ${barHtml.data}
    </div>
    <div>This is some other content rendered by legacy server</div
  </html>
  `)
})
```

This mock legacy server is basically saying, render 3 componets leveraging the Vue SSR server, two `Foo` component and a `Bar` component. The second `Foo` also has background color set to blue to start with.

And these `Foo` and `Bar` components will also be hydrated later.



## Servers
* Main renderer server runs on port `8080`
* Proxy server (for demo purpose) runs on port `8081`
* Webpack Dev Server runs on port `8082`
* Helper server (only for dev purpose) runs on `8083`