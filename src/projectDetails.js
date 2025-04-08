const projectDetails = [
    {
      videoId: 'VIDEO_ID_1',
      title: 'Closet Care Buddy',
      author: 'Gabriela Buraglia',
      description: 'This application is focused on supporting people as they clean out their closet by first describing the clothing item they are considering discarding and then by providing outfit inspiration ideas.'
    },
    {
      videoId: 'VIDEO_ID_2',
      title: 'Chiikana AI',
      author: 'Chunqin Cao',
      description: "project, I imagine a future where 'Integrated AI Robots' become fully customizable virtual companions that seamlessly integrate into daily life. These robots are designed to reflect the voice and likeness of the user’s favorite celebrity or fictional character, offering both emotional and functional support."
    },
    {
      videoId: 'VIDEO_ID_3',
      title: 'Ouroboros',
      author: 'Chelsi Cocking',
      description: "Ouroboros — name derived from the ancient symbol of a serpent or dragon eating its own tail, representing a cycle of death — is small prototypical interactive website in which a user can input an informative excerpt or message of their choice and witness what happens when OpenAI's GPT-4o references itself, over and over again, in a cyclical loop."
    },
    {
      videoId: 'VIDEO_ID_4',
      title: 'Mood Tracker',
      author: 'Shi Ding',
      description: "The idea of this project is an interactive GenAI application that designed to guide users through journal prompts such as date, location, weather and feelings and then provide personalized music playlist as a way to improve mental health. "
    },
    {
      videoId: 'VIDEO_ID_5',
      title: 'RecipeCraft',
      author: 'Jane He',
      description: "RecipeCraft is an AI tool that can generate recipes based on available food ingredients provided by the users. It is designed to speed up the decision-making process of what to cook. Users can manually enter food ingredients, or upload a photo to the object recognition model"
    },
    {
      videoId: 'VIDEO_ID_6',
      title: 'AI Corp',
      author: 'Freya (Huijia) Huang',
      description: "The game, AI Corp: Front Desk Challenge, is a dynamic and educational experience designed to teach players fundamental principles of AI workflows through interactive gameplay. Players take on the role of a front desk operator at an AI corporation, tasked with classifying NPC requests into the appropriate AI departments."
    },
    {
      videoId: 'VIDEO_ID_7',
      title: 'Personalize Learning with AI',
      author: 'Yujiao Liu',
      description: "The goal of this project is to demonstrate how AI can be used to promote creativity and critical thinking. Early ideas about AI in education focused on AI taking over or assisting teachers with teaching tasks. However, this project sees AI as part of a larger learning system that works with, rather than replaces, human educators."
    },
    {
      videoId: 'VIDEO_ID_8',
      title: 'NEXUS',
      author: 'Jingyi Ma',
      description: "NEXUS envisions a future where AGI seamlessly orchestrates daily travel experiences in 2080. The project began with implementing its restaurant recommendation scenario, where users can naturally converse with an AI assistant to discover dining options. "
    },
    {
      videoId: 'VIDEO_ID_9',
      title: 'AI Assistant for Teaching Assistants',
      author: 'Vyshnavi Namani',
      description: "Computer science teaching assistants will use this AI model application to better prepare for office hours and recitations. Using GPT and a knowledge library of related past student scenarios, this will be a conversational application. "
    },
    {
      videoId: 'VIDEO_ID_10',
      title: 'Dreamlab',
      author: 'Chengzhi Zhang',
      description: "Dreamlab is an web app for supporting designers and clients collaborate remotely to achieve the same design vision. Usually at the beginning of a design project, the design space is ambiguous and hard to interpret. With the dream lab artboard, participants can collaborate with each other and see each other’s design ideas with images, which creates a more solid shared understanding for design communication"
    }
  ];


  const VideoCard = ({ videoId, title, author, description, onClick }) => (
    <div className="card mb-4 shadow-sm" onClick={onClick} style={{ cursor: 'pointer', zIndex: 10 }}>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{author}</h6>
        <p className="card-text text-muted small">{description}</p>
      </div>
      <div className="ratio ratio-16x9">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );