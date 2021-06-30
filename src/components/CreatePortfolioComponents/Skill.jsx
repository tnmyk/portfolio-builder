import { AiOutlinePlus } from "react-icons/ai";
const Skill = ({name,setSkillArr,skillArr,id}) => {
    const handleRemove =()=>{
        setSkillArr(skillArr.filter(skill=> skill.id!==id))
    }
    return (
      <div className="skill">
        <span>{name} </span><AiOutlinePlus onClick={handleRemove} className="add-icon remove-icon skill-remove" />
      </div>
    );
}
 
export default Skill;