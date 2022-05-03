import { FC } from "react";

interface Props {
  snippet: string;
}

const MarkdownSnippet: FC<Props> = (props) => {
  const { snippet } = props;
  return <div dangerouslySetInnerHTML={{ __html: snippet }} />;
};

export default MarkdownSnippet;
