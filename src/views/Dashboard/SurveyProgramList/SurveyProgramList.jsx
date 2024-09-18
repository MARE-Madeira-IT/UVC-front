import { Cascader, Checkbox, Col, DatePicker, Input, Row, Select } from "antd";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { fetchSurveyPrograms } from "../../../../redux/redux-modules/surveyProgram/actions";

const Container = styled.section`
  width: 100%;
  display: flex;
  margin: 50px 0px;
  box-sizing: border-box;
`;

const FilterContainer = styled.section`
  width: 30%;
  padding: 0px 30px 0px 0px;
  box-sizing: border-box;

  .buttons {
    margin-top: 30px;
    gap: 10px;
  }
`;

const ListContainer = styled.section`
  width: 100%;
  box-sizing: border-box;
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

const SurveyProgram = styled.div`
  width: 100%;
  padding: 20px 20px 10px 20px;
  border-radius: 6px;
  box-sizing: border-box;
  box-shadow: 0px 0px 10px 0px rgba(123, 123, 123, 0.2);
  margin-bottom: 30px;

  .title {
    display: flex;
    justify-content: space-between;

    h3 {
      margin-top: 0px;
    }
  }

  .links {
    margin-left: 30px;
    align-items: flex-start;
    gap: 10px;
  }

  .charateristics {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
`;

function SurveyProgramList(props) {
  const { data, loading } = props;
  const [filters, setFilters] = useState({});

  useEffect(() => {
    handleSearch();
  }, []);

  const handleSearch = () => {
    props.fetchSurveyPrograms(filters);
  };

  return (
    <Container>
      <FilterContainer>
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
                { label: "Northern America", value: "Northern America" },
                { label: "South America", value: "South America" },
                { label: "Central America", value: "Central America" },
                { label: "Caribbean", value: "Caribbean" },
              ],
            },
            {
              label: "Africa",
              value: "Africa",
              children: [
                { label: "Northern Africa", value: "Northern Africa" },
                { label: "Eastern Africa", value: "Eastern Africa" },
                { label: "Middle Africa", value: "Middle Africa" },
                { label: "Southern Africa", value: "Southern Africa" },
                { label: "Western Africa", value: "Western Africa" },
              ],
            },
            {
              label: "Europe",
              value: "Europe",
              children: [
                { label: "Western Europe", value: "Western Europe" },
                { label: "Eastern Europe", value: "Eastern Europe" },
                { label: "Southearn Europe", value: "Southearn Europe" },
                { label: "Northearn Europe", value: "Northearn Europe" },
              ],
            },
            {
              label: "Asia",
              value: "Asia",
              children: [
                { label: "Central Asia", value: "Central Asia" },
                { label: "Eastern Asia", value: "Eastern Asia" },
                { label: "South-eastern Asia", value: "South-eastern Asia" },
                { label: "Southern Asia", value: "Southern Asia" },
                { label: "Western Asia", value: "Western Asia" },
              ],
            },
            { label: "Antarctica", value: "Antarctica" },
            {
              label: "Oceania",
              value: "Oceania",
              children: [
                {
                  label: "Australia and New Zealand",
                  value: "Australia and New Zealand",
                },
                { label: "Melanesia", value: "Melanesia" },
                { label: "Micronesia", value: "Micronesia" },
                { label: "Polynesia", value: "Polynesia" },
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
      <ListContainer>
        <h2>Survey Program(s)</h2>

        {data.map((surveyProgram) => (
          <SurveyProgram key={surveyProgram.id}>
            <div className="title">
              <div>
                <h3>{surveyProgram.name}</h3>
                <p>{surveyProgram.description}</p>
              </div>
              <Buttons className="links">
                <a
                  href={
                    "mailto:" +
                    surveyProgram.contact +
                    "?subject=[Underwater Survey] " +
                    surveyProgram.name
                  }
                >
                  <button className="secundary">
                    <img src="/assets/icons/contact.svg" alt="contact" />{" "}
                    Contact
                  </button>
                </a>
                {surveyProgram.public ? (
                  <button>
                    <img src="/assets/icons/download.svg" alt="download" />{" "}
                    Download
                  </button>
                ) : (
                  <></>
                )}
              </Buttons>
            </div>

            <div className="charateristics">
              <div className="charateristic">
                <h4>Stage</h4>
                <p>{surveyProgram.stage}</p>
              </div>
              <div className="charateristic">
                <h4>Community size</h4>
                <p>{surveyProgram.community_size}</p>
              </div>
              <div className="charateristic">
                <h4>Period</h4>
                <p>
                  {surveyProgram.start_period} /{" "}
                  {surveyProgram.end_period ? surveyProgram.end_period : "---"}
                </p>
              </div>
              <div className="charateristic">
                <h4>Geographic area</h4>
                <p>{surveyProgram.geographic_area}</p>
              </div>
              <div className="charateristic">
                <h4>Created</h4>
                <p>{surveyProgram.created_at}</p>
              </div>
              <div className="charateristic">
                <h4>Last updated</h4>
                <p>{surveyProgram.updated_at}</p>
              </div>
            </div>
          </SurveyProgram>
        ))}
      </ListContainer>
    </Container>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSurveyPrograms: (filters) => dispatch(fetchSurveyPrograms(filters)),
  };
};

const mapStateToProps = (state) => {
  return {
    data: state.surveyProgram.data,
    loading: state.surveyProgram.loading,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SurveyProgramList);
