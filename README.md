### Reactivity

:star2: 从 0 到 1 实现响应式视图更新, 实现一个乞丐版的 Vueact! (怎么从开发一个 chrome TodoList extension 歪到这儿了? :joy:)

:sparkles: 没错, 我愿称之为 Vueact :joy: 哈哈哈

### Safe to eat

```bash
npm i
npm run dev
```

### Vueact

:surfer: 采用了 Vue & React 两者的一些特性和自己的一些想法实现的一个简单的数据驱动视图功能

:ski: 仍是按常理出牌, 分为数据监听和模板编译以及中间状态的一些调度, 最终状态就是下面这幅模样:

```js
// emmm
// App -> reactive -> render

function App() {

  const data = useReactive({
    count: 1,
  })

  const onClick = () => {
    data.count += 1;
  }

  return {
    template: `
      <div>
        <span>{{ data.count }}</span>
        <button onClick={onClick}>click me change count</button>
      </div>
    `,
    state: {
      data,
    },
    methods: {
      onClick,
    },
  }
}

renderDom(App(), document.getElementById('app'));
```