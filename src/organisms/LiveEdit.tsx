import React from 'react';
import exp from 'constants';
import {LiveEditor, LiveError, LivePreview, LiveProvider} from 'react-live';
import styled from '@emotion/styled';
import {css} from '@emotion/react';
import dracula from 'prism-react-renderer/themes/dracula';

const StyledProvider = styled(LiveProvider)`
  border-radius: 4px;
  box-shadow: 1px 1px 20px rgba(20, 20, 20, 0.27);
  overflow: hidden;
  margin-bottom: 2rem;
`;

const LiveWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: stretch;
  align-items: stretch;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const column = css`
  flex-basis: 50%;
  width: 50%;
  max-width: 50%;
  @media (max-width: 600px) {
    flex-basis: auto;
    width: 100%;
    max-width: 100%;
  }
`;

const StyledEditor = styled.div`
  background: #2b2b2b;
  caret-color: white;
  font-family: 'Source Code Pro', monospace;
  font-size: 14px;
  height: 350px;
  max-height: 350px;
  overflow: auto;
  ${column};
  * > textarea:focus {
    outline: none;
  }
`;

const StyledPreview = styled(LivePreview)`
  position: relative;
  padding: 0.5rem;
  background: white;
  color: black;
  height: auto;
  overflow: hidden;
  ${column};
`;

const StyledError = styled(LiveError)`
  display: block;
  padding: 4rem;
  background: #e03939;
  color: #fffff;
  white-space: pre-wrap;
  text-align: left;
  font-size: 0.9em;
  font-family: 'Source Code Pro', monospace;
`;

const LiveEdit: React.FC = () => (
  <StyledProvider theme={dracula} code={'<p>Test</p>'}>
    <LiveWrapper>
      <StyledEditor>
        <LiveEditor />
      </StyledEditor>
      <StyledPreview />
    </LiveWrapper>

    <StyledError />
  </StyledProvider>
)

export default LiveEdit;
