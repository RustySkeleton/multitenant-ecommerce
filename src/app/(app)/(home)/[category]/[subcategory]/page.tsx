interface Props{
    params:Promise<{
        category:string;
        subcategory:string;
    }>
    // Promise allows us to properly access properties after awaiting them instead of using em directly
}


const Page = async ({params}:Props)=>{
    const {category,subcategory}=await params;

    return (
        <div>
            Category: {category}<br/>
            Subcategory: {subcategory}
        </div>
    );
};
export default Page;