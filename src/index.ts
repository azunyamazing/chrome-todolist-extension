import { useReactive } from "./reactive";
import { renderDOM } from "./template";

function App() {
  const data = useReactive({
    message: "跟随输入框响应式改变值",
    count: 0,
  });

  const onClick = () => {
    data.count += 1;
    console.log('button click');
  };

  const onChange = (e: Event) => {
    const input = e.target as HTMLInputElement;
    data.message = input.value;
    console.log('input change');
  };

  return {
    template: `
      <div id="eriri">
        <div style="margin: 50px">
          <h3>{{ data.message }}</h3>
          <input value="" onChange={onChange} />
        </div>
        <div style="margin: 50px">
          <span>{{ data.count }}</span>
          <button onClick={onClick}>click me change count</button>
        <div>
      </div>
    `,
    state: {
      data,
    },
    methods: {
      onClick,
      onChange,
    },
  };
}

renderDOM(App(), document.getElementById("app"));
