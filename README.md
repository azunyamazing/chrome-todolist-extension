### chrome-todolist-extension

:star2: Chrome 扩展工具, 用于记录日常的 Todolist

:collision: 放心食用步骤：

1. 下载仓库文件代码本地 `git clone https://github.com/azunyamazing/promise-a-plus.git`
2. 浏览器输入 `chrome://extensions/` 进入扩展页面, 点击加载已解压的扩展程序, 选择 dist 文件夹即可
3. 点击浏览器右上角插件 icon， 可以固定在导航栏上， 点击 todolist icon

### Debug

```bash
npm i
npm run build
```

### Vueact

:sparkles: 实现功能所采用的技术, 我愿称之为 Vueact :joy: 哈哈哈

:boom: 总之，主要采用数据驱动视图技术去完成这个功能

```js
// emmm
// App -> reactive -> render

function App() {

  const state = useReactive({
    count: 1,
  })

  const onClick = () => {
    state.count = 2;
  }

  return {
    template: '<h1 onClick={onClick}>{{ count }}</h1>',
    state,
    methods: {
      onClick,
    },
  }
}

renderDom(App(), document.getElementById('app'));
```