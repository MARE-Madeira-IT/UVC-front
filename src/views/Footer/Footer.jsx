import { Col, Divider, Row } from "antd";
import styles from "./Footer.module.css";
import { Link } from "react-router-dom";
import {
  InstagramOutlined,
  YoutubeOutlined,
  FacebookOutlined,
  LinkedinOutlined,
  XOutlined,
  GlobalOutlined,
} from "@ant-design/icons";

const partners = [
  { url: "https://mare-madeira.pt/", imageName: "logoMARE" },
  { url: "https://wave-labs.org/", imageName: "logoWave" },
  { url: "https://arditi.pt/", imageName: "logoArditi" },
  { url: "https://arnet.pt/", imageName: "logoArnet" },
  { url: "https://www.uma.pt/", imageName: "logoUMa" },
  { url: "https://www.fct.pt/", imageName: "logoFCT" },
];

function Footer() {
  return (
    <div className={styles.container}>
      <Divider style={{ borderTop: "1px solid grey" }} />
      <Row gutter={[16, 16]} justify={"space-around"} align={"middle"}>
        {partners.map((element, index) => (
          <Col key={index} lg={2} md={3} sm={4} xs={6}>
            <Link to={element.url} target="_blank">
              <div className={styles.logos}>
                <img
                  src={`/assets/logos/${element.imageName}.webp`}
                  alt="Logos of funders"
                />
              </div>
            </Link>
          </Col>
        ))}
      </Row>

      <div className={styles.description}>
        <p>©{new Date().getFullYear()} | MARE-Madeira</p>
        <p>Contact: team@wave-labs.org</p>
      </div>

      <Row className={styles.socialLogos} align={"middle"}>
        <Link to={"https://mare-madeira.pt/"} target="_blank">
          <GlobalOutlined />
        </Link>
        <Link
          to={"https://www.instagram.com/mare_madeira/?hl=en"}
          target="_blank"
        >
          <InstagramOutlined />
        </Link>
        <Link to={"https://www.youtube.com/@mare-madeira"} target="_blank">
          <YoutubeOutlined />
        </Link>
        <Link to={"https://www.facebook.com/MARE.Madeira"} target="_blank">
          <FacebookOutlined />
        </Link>
        <Link to={"https://twitter.com/MARE_Madeira"} target="_blank">
          <XOutlined />
        </Link>
        <Link
          to={"https://www.linkedin.com/company/mare-madeira/"}
          target="_blank"
        >
          <LinkedinOutlined />
        </Link>
      </Row>
    </div>
  );
}

export default Footer;
