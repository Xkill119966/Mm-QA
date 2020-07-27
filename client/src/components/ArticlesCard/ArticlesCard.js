import React from "react";
import { Link } from "react-router-dom";

import { Flex, Label, LabelTypes } from "../../@ui";
import {
  StyledBugCard,
  BugCardIcon,
  StyledMetaInfo
} from "./ArticlesCard.style";

export const BugMetaInfo = ({ number, date, author }) => (
  <StyledMetaInfo className="text--light">
    <span className="bug__number">#{number}</span> / on {date} by{" "}
    <Link to={`/profiles/${author.username}`}>{author.name}</Link>
  </StyledMetaInfo>
);

const BugCard = ({ number, title, labels, body, isOpen, date, author }) => {
  return (
    <StyledBugCard>
      <BugCardIcon isOpen={isOpen} />
      <BugMetaInfo number={number} date={date} author={author} />

      <Link to={`/dashboard/bugs/${number}`}>
        <h3 className="bug__title">{title}</h3>
      </Link>

      {labels.length ? (
        <Flex gap="medium" className="mt-large">
          {labels.map((label, index) => (
            <Link key={index} to={`/dashboard/bugs/?label=${label}`}>
              <Label type={label}>{label}</Label>
            </Link>
          ))}
        </Flex>
      ) : null}

      <div className="bug__body--text mt-large">{body.slice(0, 150)}</div>
    </StyledBugCard>
  );
};

export default React.memo(BugCard);
