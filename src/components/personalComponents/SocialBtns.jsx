import {
  AiOutlineInstagram,
  AiOutlineLinkedin,
  AiOutlineTwitter,
  AiOutlineFacebook,
  AiOutlineYoutube,
} from "react-icons/ai";

const SocialBtns = ({ socialLinks }) => {
  const keys = Object.keys(socialLinks);

  const openWindow = (link) => {
    window.open(link, "_blank", "noopener,noreferrer");
  };

  const ReturnBtns = ({ socialname }) => {
    if (socialLinks[socialname].trim() === "") return '';

    switch (socialname) {
      case "instagram":
        return (
          <AiOutlineInstagram
            className="personal-social-btns"
            onClick={() => {
              openWindow(socialLinks[socialname]);
            }}
          />
        );
      case "twitter":
        return (
          <AiOutlineTwitter
            className="personal-social-btns"
            onClick={() => {
              openWindow(socialLinks[socialname]);
            }}
          />
        );
      case "linkedin":
        return (
          <AiOutlineLinkedin
            className="personal-social-btns"
            onClick={() => {
              openWindow(socialLinks[socialname]);
            }}
          />
        );
      case "facebook":
        return (
          <AiOutlineFacebook
            className="personal-social-btns"
            onClick={() => {
              openWindow(socialLinks[socialname]);
            }}
          />
        );
      case "youtube":
        return (
          <AiOutlineYoutube
            className="personal-social-btns"
            onClick={() => {
              openWindow(socialLinks[socialname]);
            }}
          />
        );
      default:
        return ''
    }
  };

  return (
    <div className="personal-social-btns-container">
      {keys.map((socialname, index) => {
        return <ReturnBtns socialname={socialname} key={index} />;
      })}
    </div>
  );
};

export default SocialBtns;
