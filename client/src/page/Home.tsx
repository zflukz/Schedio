import Navbar from '../component/Navbar';
import Upcomingcard from '../component/Comingcard';
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
		<div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[30px]">	
          <Upcomingcard
            title="Workshop React & TypeScript"
            date="19 Sep 2025"
            time="13:30 - 15:30 "
            place="CB2201"
            objective="Learn how to build a React app with TypeScript"
            description="In this workshop, we will cover the basics of React with TypeScript, including components, props, state, and more."
            organizer="Tech Community"
            participants={25}
            maxParticipants={50}
          />
          <Upcomingcard
            title="Workshop React & TypeScript"
            date="19 Sep 2025"
            time="13:30 - 15:30 "
            place="CB2201"
            objective="Learn how to build a React app with TypeScript"
            description="In this workshop, we will cover the basics of React with TypeScript, including components, props, state, and more."
            organizer="Tech Community"
            participants={25}
            maxParticipants={50}
          />
          <Upcomingcard
            title="Workshop React & TypeScript"
            date="19 Sep 2025"
            time="13:30 - 15:30 "
            place="CB2201"
            objective="Learn how to build a React app with TypeScript"
            description="In this workshop, we will cover the basics of React with TypeScript, including components, props, state, and more."
            organizer="Tech Community"
            participants={25}
            maxParticipants={50}
          />
        </div>
        
    </div>
  );
}

export default Home;
