import React from 'react'
import { Breadcrumb, Feature } from '../../components'
import { FaFacebook, FaInstagram, FaPlay, FaTiktok, FaTwitter } from 'react-icons/fa'

const About = () => {
  const data = [
    { name: "Nguyễn Thị A", image: "person1.png" },
    { name: "Trần Thị B", image: "person1.png" },
    { name: "Nguyễn Thị C", image: "person1.png" },
  ]

  return (
    <>
      <Breadcrumb title="Giới Thiệu" />
      <div className="about-area pt-100px pb-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="about-wrapper text-center">
                <div className="about-contant">
                  <h2 className="title">
                    <span>HDuong</span>
                    – Giới Thiệu
                  </h2>
                  <p>
                    Chào mừng bạn đến với HDuong – nơi cung cấp các sản phẩm điện thoại chất lượng cao từ những thương hiệu hàng đầu.
                    Chúng tôi cam kết mang đến cho khách hàng những trải nghiệm mua sắm tiện lợi, an toàn và đáng tin cậy.
                    Với đội ngũ nhân viên chuyên nghiệp và dịch vụ hậu mãi chu đáo, HDuong luôn nỗ lực không ngừng để đáp ứng mọi nhu cầu về công nghệ của bạn.
                  </p>
                </div>
                <div className="promo-video">
                  <img src="Background1.jpg" alt="Giới thiệu HDuong" />
                  <a href="https://www.youtube.com/watch?v=gQfnAsupJ7k" className="venobox overlay-box" data-vbtype="video">
                    <span className="fa fa-play"><i className="ripple"><FaPlay style={{marginTop: "22px", fontSize: "30px"}} /></i></span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="team-area">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-title text-center">
                <h2 className="title line-height-1">Nhân Sự</h2>
                <p>Các thành viên trong HDuong</p>
              </div>
            </div>
          </div>
          <div className="row pb-100px">
            {data.map((member, index) => (
              <div key={index} className="col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-lm-30px mb-lg-30px mb-md-30px">
                <div className="team-wrapper">
                  <div className="team-image overflow-hidden">
                    <img src={member.image} alt={member.name} />
                    <ul className="team-social d-flex">
                      <li>
                        <a className="m-0" title="Facebook" href="/"><i><FaFacebook/></i></a>
                      </li>
                      <li>
                        <a title="Tumblr" href="/"><i><FaInstagram/></i></a>
                      </li>
                      <li>
                        <a title="Twitter" href="#/"><i><FaTwitter/></i></a>
                      </li>
                      <li>
                        <a title="Instagram" href="/"><i><FaTiktok/></i></a>
                      </li>
                    </ul>
                  </div>
                  <div className="team-inner">
                    <div className="team-content">
                      <h6 className="title">{member.name}</h6>
                      <span className="sub-title">Thành Viên</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default About
