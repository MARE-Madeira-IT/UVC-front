import { Cascader, Checkbox, Col, DatePicker, Input, Row, Select } from "antd";
import { useEffect } from "react";
import { connect } from "react-redux";
import { fetchWorkspacesSelector } from "../../../../redux/redux-modules/workspace/actions";
import styled from "styled-components";

const FilterContainer = styled.section`
  width: 30%;
  padding: 0px 30px 0px 0px;
  box-sizing: border-box;

  .buttons {
    margin-top: 30px;
    gap: 10px;
  }
`;

const Buttons = styled.div`
  display: flex;

  a {
    text-decoration: none;
  }

  button {
    cursor: pointer;
    padding: 10px;
    border-radius: 6px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    gap: 5px;
    box-shadow: 0px;
    border: 1px solid #044582;
    background-color: #044582;
    color: white;

    img {
      width: 15px;
    }
  }

  .secundary {
    background-color: white;
    color: #044582;
  }
`;

function ProjectFilters({
  filters,
  setFilters,
  workspaceSelectors,
  handleSearch,
  fetchWorkspacesSelector,
}) {
  useEffect(() => {
    fetchWorkspacesSelector();
  }, []);

  return (
    <FilterContainer>
      <h3>Workspace</h3>
      <Select
        mode="multiple"
        allowClear
        showSearch
        value={filters.workspace}
        optionFilterProp="label"
        onChange={(e) => setFilters({ ...filters, workspace: e })}
        style={{ width: "100%" }}
        options={workspaceSelectors?.map((el) => ({
          label: el.name,
          value: el.id,
        }))}
      />

      <h3>Title</h3>
      <Input
        value={filters.name}
        onChange={(e) => setFilters({ ...filters, name: e.target.value })}
      />

      <h3>Stage</h3>
      <Checkbox.Group
        value={filters.stage}
        onChange={(e) => setFilters({ ...filters, stage: e })}
      >
        <Row>
          <Col span={24}>
            <Checkbox value="Ongoing">Ongoing</Checkbox>
          </Col>
          <Col style={{ margin: "5px 0px" }} span={24}>
            <Checkbox value="Completed">Completed</Checkbox>
          </Col>
          <Col span={24}>
            <Checkbox value="Archived">Archived</Checkbox>
          </Col>
        </Row>
      </Checkbox.Group>

      <h3>Visibility</h3>
      <Checkbox.Group
        value={filters.visibility}
        onChange={(e) => setFilters({ ...filters, visibility: e })}
      >
        <Row>
          <Col span={24}>
            <Checkbox value="Public">Public</Checkbox>
          </Col>
          <Col style={{ marginTop: "5px" }} span={24}>
            <Checkbox value="Private">Private</Checkbox>
          </Col>
        </Row>
      </Checkbox.Group>

      <h3>Date range</h3>
      <DatePicker.RangePicker
        picker="year"
        value={filters.date}
        onChange={(e) => setFilters({ ...filters, date: e })}
      />

      <h3>Community</h3>
      <Select
        value={filters.communitySize}
        onChange={(e) => setFilters({ ...filters, communitySize: e })}
        style={{ width: "100%" }}
        options={[
          { value: "<10", label: "<10" },
          { value: "10-50", label: "10-50" },
          { value: "50-100", label: "50-100" },
          { value: "100-500", label: "100-500" },
          { value: ">500", label: ">500" },
        ]}
      />

      <h3>Geographic area</h3>
      <Cascader
        value={filters.geographicArea}
        style={{ width: "100%" }}
        options={[
          { label: "Worldwide", value: "Worldwide" },
          {
            label: "America",
            value: "America",
            children: [
              { value: "Northern America", label: "North America" },
              { value: "South America", label: "South America" },
              { value: "Central America", label: "Central America" },
              { value: "Caribbean", label: "Caribbean" },
            ],
          },
          {
            label: "Africa",
            value: "Africa",
            children: [
              { value: "Northern Africa", label: "Northern Africa" },
              { value: "Eastern Africa", label: "Eastern Africa" },
              { value: "Middle Africa", label: "Middle Africa" },
              { value: "Southern Africa", label: "Southern Africa" },
              { value: "Western Africa", label: "Western Africa" },
            ],
          },
          {
            label: "Europe",
            value: "Europe",
            children: [
              { value: "Western Europe", label: "Western Europe" },
              { value: "Eastern Europe", label: "Eastern Europe" },
              { value: "Southearn Europe", label: "Southearn Europe" },
              { value: "Northearn Europe", label: "Northearn Europe" },
            ],
          },
          {
            label: "Asia",
            value: "Asia",
            children: [
              { value: "Central Asia", label: "Central Asia" },
              { value: "Eastern Asia", label: "Eastern Asia" },
              { value: "South-eastern Asia", label: "South-eastern Asia" },
              { value: "Southern Asia", label: "Southern Asia" },
              { value: "Western Asia", label: "Western Asia" },
            ],
          },
          { value: "Antarctica", label: "Antarctica" },
          {
            label: "Oceania",
            value: "Oceania",
            children: [
              {
                value: "Australia and New Zealand",
                label: "Australia and New Zealand",
              },
              { value: "Melanesia", label: "Melanesia" },
              { value: "Micronesia", label: "Micronesia" },
              { value: "Polynesia", label: "Polynesia" },
            ],
          },
        ]}
        onChange={(e) => setFilters({ ...filters, geographicArea: e })}
        multiple
        maxTagCount="responsive"
      />
      <Buttons className="buttons">
        <button onClick={() => setFilters({})} className="secundary">
          <img src="/assets/icons/reset.svg" alt="reset" /> Reset
        </button>
        <button onClick={handleSearch}>
          <img src="/assets/icons/apply.svg" alt="apply" /> Apply
        </button>
      </Buttons>
    </FilterContainer>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchWorkspacesSelector: (filters) =>
      dispatch(fetchWorkspacesSelector(filters)),
  };
};

const mapStateToProps = (state) => {
  return {
    workspaceSelectors: state.workspace.selector,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectFilters);
