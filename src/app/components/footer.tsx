import { FaCode ,FaHeart} from "react-icons/fa";

export default function Footer(){
    return(
    
    <footer className="container mx-auto py-8  leafcon  max-w-6xl mt-10">
    <div className="flex justify-center my-8">
      <div className="w-64 h-64">
       
      </div>
    </div>
    <div className="container mx-auto text-3xl flex items-center justify-center gap-5">
      <p className="flex items-center">
        <FaCode /> with <FaHeart color="red" className="mx-2" /> by akanksha, Copyrights reserved to Akanksha Bhagat 2024.
      </p>
    </div>
  </footer>
    )
}