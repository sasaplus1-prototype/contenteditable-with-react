import * as React from "react";
import * as ReactDOM from "react-dom";

type Props = {
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLDivElement>) => void;
}; // & HTMLDivElement;

function ContentEditable(props: Props) {
  const { onChange, value = "" } = props;

  const defaultValue = React.useRef(value);

  return (
    <div
      contentEditable={true}
      dangerouslySetInnerHTML={{ __html: defaultValue.current }}
      onInput={onChange}
    />
  );
}

function App() {
  const [key, setKey] = React.useState("1");
  const [value, setValue] = React.useState("");

  return (
    <div>
      <ContentEditable
        key={key}
        onChange={(event) => {
          console.log(event.target.innerHTML);
          setValue(event.target.innerHTML);
        }}
        value={value}
      />
      <button
        type="button"
        onClick={() => {
          setKey(String(Math.random()));
          setValue("<b>foo</b>");
        }}
      >
        edit1
      </button>
      <button
        type="button"
        onClick={() => {
          setKey(String(Math.random()));
          setValue("<b>foo<i>bar<i></b>");
        }}
      >
        edit2
      </button>
      <button
        type="button"
        onClick={() => {
          setKey(String(Math.random()));
          setValue("<b>foo<i>bar</i>ba</b>z");
        }}
      >
        edit3
      </button>
      <button
        type="button"
        onClick={() => {
          setTimeout(() => {
            setKey(String(Math.random()));
            setValue("<b>foo<i>bar</i>ba</b>zasdasdf");
          }, 500);
        }}
      >
        setTimeout
      </button>
    </div>
  );
}

const root = document.getElementById("js-root");

if (root) {
  ReactDOM.render(<App />, root);
}
