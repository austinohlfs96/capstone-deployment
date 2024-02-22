
import React from "react";
import { Segment, Image } from "semantic-ui-react";
import Head from "./Header";


const LandingPage = () => {
  return (
    <div>
      <Head />
      {/* <Segment style={{ background: "#f0f0f0", textAlign: "center" }}> */}
      <div style={{ position: "relative", marginTop: "10px", width: '100%', height: '20%' }}>
  <Image
    src="https://content.invisioncic.com/n281171/monthly_2020_03/image.png.1219740564eea0550ff238a905befbf5.png"
    fluid
    centered
  />
  <div
    style={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      color: "white",
      margin: 'auto',
      width: '57%', // Set width to 80% of the parent container's width
      height: '50%', // Set height to 80% of the parent container's height
    }}
  >
    <Segment style={{ background: 'rgba(255, 255, 255, 0.4)', width: '56vw', height: '31vw', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <h1 style={{ fontSize: '4.3vw', color: '#05082b' }}>
        <Image src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Valknut.svg/1200px-Valknut.svg.png' size='tiny' style={{width: "9vw", height: "auto"}}/>
         Æsir Speed Techs
      </h1>
      <p style={{ fontSize: '1.5vw', color: '#05082b' }}>GO FAST TAKE CHANCES!</p>
    </Segment>
  </div>
</div>

      {/* </Segment> */}
      <div style={{marginTop: "3vw"}}>
      <Segment style={{ 
        background: 'rgba(16, 51, 78, 0.6)',
        marginRight: '9px',
        marginLeft: '9px',
        marginTop: "70px",
        height: 'auto'
         }}>
        <Image
          src="https://www.usskiandsnowboard.org/sites/default/files/paragraph/single-image-caption/2020-01/maggiepodium%20.jpg"
          size="medium"
          floated="left"
        />
        <h2 style={{textAlign: "center", color: "white"}}>Mission</h2>
        <h3 style={{textAlign: "revert", color: "white"}}>
        At Æsir Speed Techs, our mission is to elevate the winter sports competition by providing unmatched tuning services that empower athletes and coaches to achieve their highest potential on the slopes. We are committed to excellence, constantly pushing the boundaries of performance tuning through innovation and precision. Our goal is to be the trusted partner for winter sports enthusiasts, delivering quality tuning that not only meets but exceeds the rigorous demands of competitive skiing and snowboarding. With a passion for the sport and a dedication to craftsmanship, we strive to enhance the joy and success of every individual who chooses Æsir Speed Techs.</h3> 
          </Segment>
          <Segment style={{ 
        background: 'rgba(16, 51, 78, 0.6)',
        marginLeft: '9px',
        marginRight: '9px',
        marginTop: "70px",
        height: 'auto'
         }}>
          <Image
          src="https://nbcsports.brightspotcdn.com/dims4/default/9966318/2147483647/strip/true/crop/2195x1235+0+128/resize/1440x810!/quality/90/?url=https%3A%2F%2Fnbc-sports-production-nbc-sports.s3.us-east-1.amazonaws.com%2Fbrightspot%2Fbe%2F53%2F26a974c6d3488d4f6700bd8145ae%2Fdwise.jpg"
          size="medium"
          floated="right"
        />
        <h2 style={{textAlign: "center", color: "white"}}>Premier Services</h2>
          <h3 style={{textAlign: "left", color: "white"}}>Discover a new level of performance with Æsir Speed Techs' premier tuning services. Our offerings are meticulously crafted to cater to the unique needs of athletes and coaches, setting us apart as the premier destination for professional ski and snowboard tuning. We utilize cutting-edge equipment and high-end products to ensure that every tuning process is executed with precision.

</h3> 
          </Segment>
          <Segment style={{ 
        background: 'rgba(16, 51, 78, 0.6)',
        marginRight: '9px',
        marginLeft: '9px',
        marginTop: "70px",
        height: 'auto'
         }}>
        <Image
          src="https://www.snowboarder.com/.image/t_share/MTk2MzUwOTc2MjcyNDQzMzMx/tuning-taylor-boyd-02.jpg"
          size="medium"
          floated="left"
        />
        <h2 style={{textAlign: "center", color: "white"}}>Our Crew</h2>
        <h3 style={{textAlign: "revert", color: "white"}}>Our success at Æsir Speed Techs is driven by the expertise and passion of our professional employees and technicians. With a dedicated team of skilled individuals who share a genuine love for winter sports, we take pride in delivering unparalleled tuning experiences. Our technicians are not just experts in their field; they are enthusiasts who understand the intricacies of competitive skiing and snowboarding.
        </h3>
      </Segment>
      <div style={{marginBottom: "10px"}}>
      <Image
        src="https://www.snowboarder.com/.image/ar_16:9%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:eco%2Cw_1200/MTk2MzUxNDI1MzY0ODMwMTQ3/modified-pipe.jpg"
        size="large"
        centered
      />
      </div>
    </div>
    </div>
  );
};

export default LandingPage;
