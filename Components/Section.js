const Section = (props) => {
    return (
        <div>
            <section className="banner_area">
  <div className="banner_inner d-flex align-items-center">
    <div className="container">
      <div className="banner_content d-md-flex justify-content-between align-items-center">
        <div className=" mb-md-0">
          <h2>{props.head}</h2>
          <h5>{props.message}</h5>
        </div>
        
      </div>
    </div>
  </div>
</section>
        </div>
    );
}

export default Section;