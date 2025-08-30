import React from "react";
import "./styles/notecard.css";
export const Notecard: React.FC = () => {
  return (
    <div className="notecard note snipcss-YMHah">
      <p>
        <strong>Note:</strong>{" "}
        For more information about the basics of HTML elements and attributes, see{" "}
        <a href="/en-US/docs/Learn_web_development/Core/Structuring_content/Basic_HTML_syntax#anatomy_of_an_html_element">
          Anatomy of an HTML element
        </a>.
      </p>
    </div>
  );
};
