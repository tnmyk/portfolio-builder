import {
  AiOutlineInstagram,
  AiOutlineLinkedin,
  AiOutlineTwitter,
  AiOutlineFacebook,
  AiOutlineYoutube,
  AiOutlinePlus,
} from "react-icons/ai";
const SocialLink = ({ name ,social,setSocial,socialLinks,setSocialLinks,edit}) => {
    
    const unselectedStyle={
        backgroundColor:''
    }
    const selectedStyle = {
      backgroundColor: "rgb(112, 4, 212)",
    };
    const handleSocialLink=(e)=>{
        setSocial({ ...social, [name]: !social[name] });
        setSocialLinks({ ...socialLinks, [name]:'' });

    }
    const handleSocialLinkInput =(e)=>{
        setSocialLinks({ ...socialLinks, [name]: e.target.value });
        
    }
    const icon=()=>{
        switch (name) {
          case "instagram":
            return (
              <AiOutlineInstagram className="social-link-choose-btn-icon" />
            );
            
          case "linkedin":
            return (
              <AiOutlineLinkedin className="social-link-choose-btn-icon" />
            );
            
          case "twitter":
            return <AiOutlineTwitter className="social-link-choose-btn-icon" />;
            
          case "facebook":
            return (
              <AiOutlineFacebook className="social-link-choose-btn-icon" />
            );
            
          case "youtube":
            return <AiOutlineYoutube className="social-link-choose-btn-icon" />;
            
          default:
            return ''
            
        }

    }
    return (
      <div style={{ position: "relative" }}>
        <div
          style={social[name] ? selectedStyle : unselectedStyle}
          className="social-link-choose-btn"
          onClick={handleSocialLink}
        >
          {icon()}
          {name}{" "}
          {social[name] ? (
            <AiOutlinePlus className="add-icon remove-icon" />
          ) : (
            <AiOutlinePlus className="add-icon" />
          )}
        </div>
        {edit 
          ?( social[name] && (
              <input
                type="text"
                
                value={socialLinks[name]}
                placeholder="Link 🔗"
                className="input-link"
                onChange={handleSocialLinkInput}
              ></input>
            ))
          : social[name] && (
              <input
                type="text"
                autoFocus
                value={socialLinks[name]}
                placeholder="Link 🔗"
                className="input-link"
                onChange={handleSocialLinkInput}
              ></input>
            )}
      </div>
    );
};

export default SocialLink;
