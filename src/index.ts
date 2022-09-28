import { useReactive } from "./reactive";
import { renderDOM } from "./template";

function App() {
  const data = useReactive({
    name: "Eriri",
    age: 17,
  });

  const onClick = () => {
    // data.name = "nono";
    console.log('button click');
  };

  const onChange = () => {
    // data.name = "azunya";
    console.log('input change');
  };

  return {
    template: `
      <div id="eriri">
        <span>nono</span>
        <input value={data.name} onChange={onChange} />
        <button onClick={onClick}>click me</button>
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
