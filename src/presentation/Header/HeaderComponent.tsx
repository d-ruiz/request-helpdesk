import { Navbar, NavbarBrand } from 'reactstrap';

function HeaderComponent() {

  const imgSrc = "https://www.bx-service.com/wp-content/uploads/2021/07/bx-1536x1056.png";
  return(
    <Navbar className="my-navbar mb-5" dark expand="md">
        <div className="container">
          <NavbarBrand className="mr-auto ml-auto" href="/home">
            <img src={imgSrc} height="100" width="auto"
              alt="Logo" />
          </NavbarBrand>
        </div>
      </Navbar>
  );
}

export default HeaderComponent;
