import { useReactive } from "./reactive/use-reactive";

function App() {
  const state = useReactive({
    name: "Eriri",
  });

  console.log(state);

  return {
    template: "<h1>hello Eriri~</h1>",
  };
}

App();
