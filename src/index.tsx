import { render } from "react-dom";
import { storySelect } from './_stories/storySelect';

const rootElement = document.getElementById("root");
render(storySelect(), rootElement);
