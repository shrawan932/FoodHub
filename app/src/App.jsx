import { useState ,useEffect } from "react";
import styled from "styled-components";
import SearchResult from "./components/searchResults/searchResult";

export const BASE_URL = "http://localhost:9000";

const App = () => {

  const [data,setData] = useState(null);
  const [FilteredData,setFilteredData] = useState(null);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(null);
  const [selectedBtn,setselectedBtn] = useState("all");


 

  useEffect(()=>{
    const FetchFoodData = async () =>{
      setLoading(true);
      try{
      const response = await fetch(BASE_URL);
     
      const json = await response.json();
      setData(json);
      setFilteredData(json);
      setLoading(false);
      }
      catch(error){
        setError("unable to fetch data");
      }
  
     
    };
    FetchFoodData();

  },[]);

  const SearchFood = (e) => {
    const searchValue = e.target.value;

    if(SearchFood === "")
    {
      setFilteredData(null);
    }

    const filter = data?.filter((food) =>
    food.name.toLowerCase().includes(searchValue.toLowerCase())
  );
setFilteredData(filter);
  }

console.log(data);

 const filterFood = (type)=>{
  if(type === "all"){
    setFilteredData(data);
    setselectedBtn("all");
    return;
  }
  const filter = data?.filter((food) =>
    food.type.toLowerCase().includes(type.toLowerCase())
  );
setFilteredData(filter);
setselectedBtn(type);

 }

 const filterBtns = [
  {
    name: "All",
    type: "all",
  },
 
  {
    name: "Breakfast",
    type: "breakfast",

  },
  {
    name: "Lunch",
    type: "lunch",

  },
  {
    name: "Dinner",
    type: "dinner",

  },

];

  if(error) return <div>{error}</div>
  if(loading) return<div>Loading ....</div>
  return(
    <>
    <Container>
      <TopContainer>
        <div className="logo">
          <img src="/logo.svg" alt="logo" />

        </div>

        <div className="search">
          <input onChange={SearchFood} type="text" placeholder="Search Food" />

        </div>
      </TopContainer>

      <FilterContainer>

      {filterBtns.map((value) => (
        <Button key = {value.name} onClick={() => filterFood(value.type)}>
          {value.name}
        </Button>

      ))

      }
       
      </FilterContainer>

      
    </Container>
    <SearchResult data = {FilteredData}/>
    </>
    
  );
};

export default App;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const TopContainer = styled.section`
display: flex;
height: 140px;
justify-content: space-between;
padding: 16px;
align-items: center;

.search{
  input{
    background-color: transparent;
    border: 1px solid red;
    color: white;
    border-radius: 5px;
    height: 40px;
    font-size: 16px;
    padding: 0 10px;

  }
}

@media (0 < width < 600px){
  flex-direction: column;
  height: 120px;
}

`;

const FilterContainer = styled.section`
display: flex;
justify-content: center;
gap: 12px;
padding-bottom: 40px;

`;

export const Button = styled.button`
background: #ff4343;
border-radius: 5px;
padding: 6px 12px;
border: none;
color: white;
cursor: pointer;
&:hover {
  background-color: #f22f2f;
}

`;

