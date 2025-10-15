import Navbar from '../component/Navbar';
import HorizontalScrollCards from '../component/HorizontalScrollCards';
import Eventcard from '../component/Eventcard';

interface User {
  name: string;
  role: 'admin' | 'organizer' | 'user';
}

function Home() {
  const user: User | null = null; // สมมติยังไม่ได้ login
  const events = [
      {
        title: "Cooking Chicken",
        duration: "2 hr.",
        date: "20 Oct 2025",
        time: "10:00 - 12:00 ",
        location: "CB4301",
        tags: ["art", "culture", "festival"],
        imageUrl: "https://cdn.discordapp.com/attachments/1187005922288087091/1420375835528921108/IMG_0811_2.jpeg?ex=68f03254&is=68eee0d4&hm=f894f0516b7ae90d87cb75eff9b7d1a0dafb526dac65605c25a789a15839e8ba&",
      },
      {
        title: "Chicken Language",
        duration: "2 hr.",
        date: "10 Nov 2025",
        time: "13:00 - 15:00 ",
        location: "CB1201",
        tags: ["tech", "networking"],
        imageUrl: "https://cdn.discordapp.com/attachments/1176389332140048465/1427957333304021033/7B70C761-1AB0-4A3D-BD48-7CBD581EDB4F_1_105_c.jpeg?ex=68f0c066&is=68ef6ee6&hm=b4defb4bb82934ecb05c67dba93e5efb7acb31693b16d9e4ed8698a08dc133b9&",
      },
      {
        title: "Chicken Dance",
        duration: "2 hr.",
        date: "10 Nov 2025",
        time: "13:00 - 15:00 ",
        location: "CB1201",
        tags: ["tech", "networking"],
        imageUrl: "https://cdn.discordapp.com/attachments/1176389332140048465/1427957271392026634/1A10E491-6609-44BE-A69E-FE5B01391B98_1_105_c.jpeg?ex=68f0c057&is=68ef6ed7&hm=77460ee75f2a92ffa01c9ef5fc9f8f8cbc0552dfb66a928da71583fd0987e9b7&",
      },
    ];

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
      <div className="flex justify-center pb-[60px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[30px] max-w-[1200px]">
          {events.map((event, index) => (
            <Eventcard
              key={index}
              title={event.title}
              duration={event.duration}
              date={event.date}
              time={event.time}
              location={event.location}
              tags={event.tags}
              imageUrl={event.imageUrl}
              onViewMore={() => console.log(`Viewing ${event.title}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
