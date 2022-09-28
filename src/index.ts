import { useReactive } from "./reactive";
import { renderDOM } from "./template";

function App() {
  const state = useReactive({
    name: "Eriri",
    age: 17,
  });

  console.log(state);

  const onClick = () => {
    state.name = "nono";
  };

  const onChange = () => {
    state.name = "azunya";
  };

  return {
    template: `<div id="eriri"    value={state.name} key={state.age} data-dom-eiri >
      <div onClick={onClick}>{{ state.age }}</div>
      <input value={state.name} onChange={onChange} />
      <span>nono</span>
    </div>`,
    state: {
      state,
    },
    methods: {
      onClick,
    },
  };
}

renderDOM(App(), document.getElementById("app"));
