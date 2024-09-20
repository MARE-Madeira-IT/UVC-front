import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Layout, Row, Col, Button, Affix, Drawer, Menu } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { logout } from "redux_modules/auth/actions";
import styles from "./Navbar.module.css";

const { Header } = Layout;

const navigation = [
    { name: "Home", link: "home" },
    { name: "About", link: "about" },
    { name: "Methods", link: "methods" },
    { name: "Contact", link: "contact" },
];

const authNavigation = [
    { name: "Home", link: "home" },
];

const dashboardNavigation = [
    { name: "Projects", link: "/projects" },
];

const Navbar = (props) => {
    const { isAuthenticated } = props;
    const location = useLocation();
    const { pathname } = location;
    const [inDashboard, setInDashboard] = useState(false)
    const [visible, setVisible] = useState(false);
    const [currentNavigation, setCurrentNavigation] = useState([])

    useEffect(() => {
        if (pathname.includes("dashboard")) {
            setCurrentNavigation(authNavigation)
            setInDashboard(true)
        } else {
            setCurrentNavigation(navigation)
            setInDashboard(false)
        }
    }, [pathname])


    return (
        <Affix offsetTop={0}>
            <>
                <Header style={{ boxShadow: inDashboard ? "0px 0px 15px 0px rgba(0,0,0,.2)" : "0px" }} className={styles.headerContainer}>
                    <Row className={styles.navContainer} align={"middle"}>
                        <Col xs={20} lg={4} className={styles.logo}>
                            <Link to="/">
                                <img
                                    src="/assets/logo.svg"
                                    alt="Logo of Underwater MARE website"
                                />
                            </Link>
                        </Col>
                        <Col xs={4} lg={20}>
                            <div className={styles.hidden}>
                                <Row type="flex" justify="end">
                                    <>
                                        {currentNavigation.map((element, index) => (
                                            <Link
                                                className={styles.navbarLink}
                                                key={element.name}
                                                to={{
                                                    pathname: "/",
                                                }}
                                                onClick={() => {
                                                    let el = document.getElementById(`${element.link}`);
                                                    if (el) {
                                                        el.scrollIntoView({ behavior: "smooth" });
                                                    }
                                                }}
                                            >
                                                {element.name}
                                            </Link>
                                        ))}

                                    </>
                                    {isAuthenticated ? (
                                        <>
                                            <div className={styles.spacer}>|</div>

                                            <Link
                                                className={styles.navbarLink}
                                                key={"platform"}
                                                to={"/dashboard"}
                                            >
                                                Platform
                                            </Link>

                                            {inDashboard &&
                                                <>
                                                    {dashboardNavigation.map((element) => (
                                                        <Link
                                                            className={styles.navbarLink}
                                                            key={element.name}
                                                            to={{
                                                                pathname: element.link,
                                                            }}
                                                        >
                                                            {element.name}
                                                        </Link>
                                                    ))}
                                                </>
                                            }
                                            <Link
                                                className={styles.navbarLink}
                                                key={"logout"}
                                                to=""
                                                onClick={() => {
                                                    props.logout();
                                                }}
                                            >
                                                Logout
                                            </Link>
                                        </>
                                    ) : (
                                        <>
                                            <div className={styles.spacer}>|</div>
                                            <Link
                                                className={styles.navbarLink}
                                                key={"login"}
                                                to={"/login"}
                                            >
                                                Login
                                            </Link>
                                        </>
                                    )}
                                </Row>
                            </div>

                            <div className={styles.menuButton}>
                                <Row type="flex" justify="end">
                                    <Button
                                        onClick={() => setVisible(true)}
                                        style={{ margin: "15px" }}
                                        type="primary"
                                    >
                                        <MenuOutlined />
                                    </Button>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Header>



                <Drawer
                    className={styles.drawerNavbar}
                    open={visible}
                    onClose={() => setVisible(false)}
                    placement="right"
                >
                    <Menu>
                        {isAuthenticated ? (
                            <>
                                <Menu.Item key={"platform"}>
                                    <Link
                                        className={styles.navbarLink}
                                        onClick={() => setVisible(false)}
                                        to="/dashboard"
                                    >
                                        <b>Platform</b>
                                    </Link>
                                </Menu.Item>

                                <Menu.Item key={"logout"}>
                                    <Link
                                        className={styles.navbarLink}
                                        to=""
                                        onClick={() => {
                                            props.logout();
                                        }}
                                    >
                                        <b>Logout</b>
                                    </Link>
                                </Menu.Item>
                            </>
                        ) : (
                            <Menu.Item key={"login"}>
                                <Link
                                    className={styles.navbarLink}
                                    onClick={() => setVisible(false)}
                                    to="/login"
                                >
                                    <b>Login</b>
                                </Link>
                            </Menu.Item>
                        )}

                        {navigation.map((element) => (
                            <Menu.Item key={element.name}>
                                <Link
                                    className={styles.navbarLink}
                                    key={element.name}
                                    to={`/`}
                                    onClick={() => {
                                        let el = document.getElementById(`${element.link}`);
                                        if (el) {
                                            el.scrollIntoView({ behavior: "smooth" });
                                        }
                                        setVisible(false);
                                    }}
                                >
                                    {element.name}
                                </Link>
                            </Menu.Item>
                        ))}
                    </Menu>
                </Drawer>
            </>
        </Affix >
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout()),
    };
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
