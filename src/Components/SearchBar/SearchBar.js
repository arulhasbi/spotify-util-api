import React from "react";
import styled from "styled-components";

export class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: "",
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  onInputChange(e) {
    this.setState({
      term: e.target.value,
    });
  }

  onButtonClick() {
    this.props.onSearch(this.state.term);
  }

  render() {
    return (
      <SBWrapper>
        <SBMaxWidth>
          <input
            className="w-full border-b-4 border-indigo-900"
            type="text"
            placeholder="Enter A Song, Album, or Artist"
            onChange={this.onInputChange}
            value={this.state.term}
          />
          {this.state.term && (
            <button
              className="bg-indigo-900 px-3 py-1 text-white rounded-md drop-shadow-md font-bold w-full"
              type="button"
              onClick={this.onButtonClick}
            >
              Search
            </button>
          )}
        </SBMaxWidth>
      </SBWrapper>
    );
  }
}

const SBWrapper = styled.div``;
const SBMaxWidth = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: center;
  flex-wrap: wrap;
  padding-left: 15px;
  padding-right: 15px;

  button {
    margin-top: 10px;
  }

  @media (min-width: 375px) {
    flex-wrap: nowrap;
    input {
      max-width: 256px;
      margin-right: 20px;
    }
    button {
      max-width: fit-content;
      margin-top: 0;
    }
  }
`;
