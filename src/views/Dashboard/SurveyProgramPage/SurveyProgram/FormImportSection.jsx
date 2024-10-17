import { Col, Collapse, Form } from "antd";
import styled from "styled-components";
import Dragger from "antd/es/upload/Dragger";
import { UploadOutlined } from "@ant-design/icons";
import { requiredRule } from "src/helper";

const ErrorsContainer = styled.div`
  margin-top: 15px;
  background-color: #fafafa;
  padding: 5px;
  max-height: 200px;
  overflow-y: auto;
`;

function FormImportSection({ setErrors, errors }) {
  return (
    <Col span={24}>
      <div className="import_description">
        <p>
          The import XLSX file should follow a specific
          <a
            href={`${
              import.meta.env.VITE_API
            }/templates/UW_SurveyProgram_Import.xlsx`}
          >
            {" "}
            template
          </a>
          .
        </p>
        <p>
          <span className="required">
            Content should be copied to a new xlsx file
          </span>
        </p>
        <p>All column names are not case-sensitive.</p>
        <p>
          Extra columns except for the ones in front of &quot;Indicators&quot;
          and/or &quot;Functions&quot; will be ignored.
        </p>

        <p>There should be 5 pages:</p>
        <Collapse
          accordion
          items={[
            {
              key: 1,
              label: (
                <>
                  <b>DIVE_SITE_METADATA </b> with:
                </>
              ),
              children: (
                <div>
                  <ul>
                    <li>SAMPLE#</li>
                    <li>
                      Date <span className="required">*</span>: date (YYYYMMDD)
                    </li>
                    <li>
                      Locality<span className="required">*</span>: text
                    </li>
                    <li>
                      Locality Code
                      <span className="required">*</span>: text
                    </li>
                    <li>
                      Site<span className="required">*</span>: text
                    </li>
                    <li>
                      Site Code<span className="required">*</span>: text
                    </li>
                    <li>
                      Daily_dive#<span className="required">*</span>: integer
                    </li>
                    <li>
                      Transect#<span className="required">*</span>: integer
                    </li>
                    <li>
                      Depth category
                      <span className="required">*</span>: text
                    </li>
                    <li>
                      Depth#<span className="required">*</span>: integer
                    </li>
                    <li>
                      Time#<span className="required">*</span>: integer
                    </li>
                    <li>
                      Replica<span className="required">*</span>: integer
                    </li>
                    <li>
                      Latitude<span className="required">*</span>: decimal
                    </li>
                    <li>
                      Longitude<span className="required">*</span>: decimal
                    </li>
                    <li>Heading: integer</li>
                    <li>Heading direction: decimal</li>
                    <li>Site area: text</li>
                    <li>Distance: decimal</li>
                    <li>
                      Functions: There should always be a column named
                      &quot;Functions&quot; - every column in front of it is
                      considered a survey program function.
                    </li>
                  </ul>
                  <p
                    style={{
                      margin: "0 0 0 auto",
                      width: "fit-content",
                    }}
                  >
                    <span className="required">*</span> Required
                  </p>
                </div>
              ),
            },
            {
              key: 2,
              label: (
                <>
                  <b>BENTHIC_DB </b> with:
                </>
              ),
              children: (
                <div>
                  <ul>
                    <li>
                      SAMPLE#<span className="required">*</span>: text
                    </li>
                    <li>
                      P##<span className="required">*</span>: integer
                    </li>
                    <li>
                      Substrate<span className="required">*</span>: (block,
                      rubble, boulder, platform, pavement, sand, gravel, rumble)
                    </li>
                    <li>
                      Taxa<span className="required">*</span>: text
                    </li>
                    <li>Notes: text</li>
                  </ul>
                  <p
                    style={{
                      margin: "0 0 0 auto",
                      width: "fit-content",
                    }}
                  >
                    <span className="required">*</span> Required
                  </p>
                </div>
              ),
            },
            {
              key: 3,
              label: (
                <>
                  <b>BENTHIC_TAXAS</b> with:
                </>
              ),
              children: (
                <div>
                  <ul>
                    <li>
                      Category<span className="required">*</span>:
                      (Macroinvertebrate, Substrate, Algae, Fish, Litter or
                      Other)
                    </li>
                    <li>
                      taxa<span className="required">*</span>: text
                    </li>
                    <li>
                      Genus<span className="required">*</span>: text
                    </li>
                    <li>
                      species<span className="required">*</span>: text
                    </li>
                    <li>Phylum: text</li>
                    <li>
                      Indicators: There should always be a column named
                      &quot;Indicators&quot; - every column in front of it is
                      considered a taxa indicator.
                    </li>
                  </ul>
                  <p
                    style={{
                      margin: "0 0 0 auto",
                      width: "fit-content",
                    }}
                  >
                    <span className="required">*</span> Required
                  </p>
                </div>
              ),
            },
            {
              key: 4,
              label: (
                <>
                  <b>MOTILE_DB </b>with:
                </>
              ),
              children: (
                <div>
                  <ul>
                    <li>
                      SAMPLE#<span className="required">*</span>: text
                    </li>
                    <li>
                      Survey type<span className="required">*</span>: (fish,
                      macroinvertebrates, cryptic or dom_urchin)
                    </li>
                    <li>
                      Taxa<span className="required">*</span>: text
                    </li>
                    <li>Size Category: text</li>
                    <li>
                      Surveyed area
                      <span className="required">*</span>: 100 or 200
                    </li>
                    <li>Size: number</li>
                    <li>
                      Ntotal<span className="required">*</span>: number
                    </li>
                    <li>Notes: text</li>
                  </ul>
                  <p
                    style={{
                      margin: "0 0 0 auto",
                      width: "fit-content",
                    }}
                  >
                    <span className="required">*</span> Required
                  </p>
                </div>
              ),
            },
            {
              key: 5,
              label: (
                <>
                  <b>MOTILE_TAXAS </b>with:
                </>
              ),
              children: (
                <div>
                  <ul>
                    <li>
                      Category<span className="required">*</span>:
                      (Macroinvertebrate, Substrate, Algae, Fish, Litter or
                      Other)
                    </li>
                    <li>
                      taxa<span className="required">*</span>: text
                    </li>
                    <li>
                      Genus<span className="required">*</span>: text
                    </li>
                    <li>
                      species<span className="required">*</span>: text
                    </li>
                    <li>Phylum: text</li>
                    <li>
                      Indicators: There should always be a column named
                      &quot;Indicators&quot; - every column in front of it is
                      considered a taxa indicator.
                    </li>
                  </ul>
                  <p
                    style={{
                      margin: "0 0 0 auto",
                      width: "fit-content",
                    }}
                  >
                    <span className="required">*</span> Required
                  </p>
                </div>
              ),
            },
          ]}
        />
        <Form.Item
          rules={requiredRule}
          name="file"
          valuePropName="fileList"
          getValueFromEvent={(e) => {
            setErrors([]);
            if (Array.isArray(e)) {
              return e;
            }
            return e?.fileList;
          }}
          noStyle
        >
          <Dragger
            beforeUpload={() => false}
            style={{ marginTop: "20px" }}
            multiple={false}
            accept=".xlsx"
          >
            <p className="ant-upload-drag-icon">
              <UploadOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
          </Dragger>
        </Form.Item>

        {errors?.length > 0 && (
          <div style={{ marginTop: "20px" }}>
            <p>Errors ({errors.length}):</p>
            <ErrorsContainer>
              {errors.map((el, i) => (
                <p key={i}>{el}</p>
              ))}
            </ErrorsContainer>
          </div>
        )}
      </div>
    </Col>
  );
}

export default FormImportSection;
