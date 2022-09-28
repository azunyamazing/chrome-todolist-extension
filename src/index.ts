import { useReactive } from "./reactive";
import { renderDOM } from "./template";

function App() {
  const data = useReactive({
    name: "Eriri",
    age: 17,
  });

  const onClick = () => {
    data.name = "nono";
  };

  const onChange = () => {
    data.name = "azunya";
  };

  return {
    template: `
      <div id="eriri">
        <span>nono</span>
        <div onClick={onClick}>{{ data.age }}</div>
        <input value={data.name} onChange={onChange} />
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
