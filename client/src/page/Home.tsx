import Navbar from '../component/Navbar';
import Upcomingcard from '../component/Comingcard';
import HorizontalScrollCards from '../component/HorizontalScrollCards';

interface User {
  name: string;
  role: 'admin' | 'organizer' | 'user';
}


function Home() {
  const user: User | null = null; // สมมติยังไม่ได้ login


  return (
    <div className="font-sans bg-background min-h-screen pt-[50px]">
        <Navbar user={user}/>
        <div className='flex items-center justify-center whitespace-nowrap pt-[85px] pb-[30px] text-[40px] font-bold mx-auto min-w-[500px]'>
           “ Don’t Miss These Events “
        </div>
      <div className='pb-[30px]'>
		    <HorizontalScrollCards/>
      </div>
      <div className='flex items-center justify-center whitespace-nowrap pt-[85px] pb-[30px] text-[40px] font-bold mx-auto min-w-[500px]'>
		      “ Find the Right Event for You ”
        </div>
    </div>
  );
}

export default Home;
