import React, { Component } from "react";
import { connect } from "react-redux";
import "./SidebarInput.css";
import Icon from "../components/Icon";
import { setFilterValue, toggleSidebar } from "../actions";

class SidebarInput extends Component {
  constructor(props) {
    super(props);
    this.handleResize = this.handleResize.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize() {
    const { sidebarOpen, toggleSidebar } = this.props;
    const largeScreen = window.innerWidth >= 750 ? true : false;
    if (largeScreen && sidebarOpen) {
      toggleSidebar(false);
    }
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  handleClick() {
    const { toggleSidebar, sidebarOpen } = this.props;
    toggleSidebar(!sidebarOpen);
  }

  render() {
    const {
      handleSubmit,
      handleClick,
      props: { handleFilterUsers, filterUsers, sidebarOpen }
    } = this;

    return (
      <form className="input-container" onSubmit={handleSubmit}>
        <input
          className={"Sidebar__input" + (!sidebarOpen ? " hidden" : "")}
          onChange={handleFilterUsers}
          placeholder="Search contacts..."
          value={filterUsers}
        />
        <button
          className={"Sidebar__button" + (sidebarOpen ? " open" : " closed")}
          onClick={handleClick}
        >
          <Icon icon="arrows" title={sidebarOpen ? "close" : "open"} />
        </button>
      </form>
    );
  }
}

const mapStateToProps = state => {
  const { filterUsers, handleFilterUsers, sidebarOpen } = state;
  return { filterUsers, handleFilterUsers, sidebarOpen };
};

const mapDispatchToProps = dispatch => {
  return {
    handleFilterUsers: e => {
      dispatch(setFilterValue(e.target.value));
    },
    toggleSidebar: value => {
      dispatch(toggleSidebar(value));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarInput);
