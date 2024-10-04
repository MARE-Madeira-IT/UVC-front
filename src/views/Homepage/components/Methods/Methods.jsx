import { DownloadOutlined } from "@ant-design/icons";
import { Col, Divider, Grid, Row } from "antd";
import styles from "./Methods.module.css";
const { useBreakpoint } = Grid;

function Methods() {
    const { md } = useBreakpoint();
    return (
        <Row id="methods" className={styles.container}>
            <Col xs={24} align="middle">
                <h1>Survey methods: How to report</h1>
                <p>
                    Create a report at underwater survey is very simple, just follow these
                    steps
                </p>
            </Col>
            <Col xs={24} md={11} lg={7} className={styles.sectionContainer}>
                <h1>1. Data Collection</h1>
                <p>
                    Our survey methods involve divers recording fish and invertebrate
                    species seen along underwater transects. Instructions on completing
                    data collection can be found in the RLS methods manual.
                </p>
                <a href="/assets/files/uvcMethods.csv" download>
                    <DownloadOutlined style={{ paddingRight: "10px" }} />
                    DOWNLOAD THE UVC METHODS MANUAL
                </a>
            </Col>
            <Col xs={24} md={1} className={styles.sectionContainer}>
                <Divider type={md ? "vertical" : ""} className={styles.divider} />
            </Col>
            <Col xs={24} md={11} lg={7} className={styles.sectionContainer}>
                <h1>2. Data Formatting</h1>
                <p>
                    Data entry is completed via specially-designed MS Excel templates
                    which contain species and indicators for specific conditions. The
                    template file can be found in the UVC structure document.
                </p>
                <a href="/assets/files/uvcStructure.csv" download>
                    <DownloadOutlined style={{ paddingRight: "10px" }} />
                    DOWNLOAD THE UVC STRUCTURE FILE
                </a>
            </Col>
            <Col xs={24} md={1} className={styles.sectionContainer}>
                <Divider type={md ? "vertical" : ""} className={styles.divider} />
            </Col>
            <Col xs={24} md={11} lg={7} className={styles.sectionContainer}>
                <h1>3. Data Entry</h1>
                <p>
                    After your data is prepared you need to register on the platform,
                    navigate to the reports page and create an entry by filling the
                    provided form.
                </p>
            </Col>
        </Row>
    );
}

export default Methods;
