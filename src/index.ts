import { useReactive } from "./reactive/use-reactive";
import { renderDOM } from "./template/render-dom";

function App() {
  const state = useReactive({
    name: "Eriri",
  });

  console.log(state);

  const onClick = () => {
    state.name = "nono";
  };

  const onChange = () => {
    state.name = "azunya";
  };

  return {
    template: `<div id="eriri"    value={state.name} data-dom-eiri >
      <div onClick={onClick}>{{ state.name }}</div>
      <input value={state.name} onChange={onChange} />
    </div>`,
    state,
    methods: {
      onClick,
    },
  };
}

renderDOM(App(), document.getElementById("app"));
