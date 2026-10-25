import React from 'react'
import { PrimaryButton } from '../../../../components/buttons';
import Card from "../../../../components/card";

const TextComponent = ({
  title,
  excerpt,
  description,

}: {
  title: string;
  excerpt:string;
  description: string;
  
}) => {
  return (
    <div className="py-10 text-center flex flex-col gap-y-3 px-12">
      <h3 className="text-2xl md:text-2xl font-bold text-gray-900">{title}</h3>
      <h3 className='relative text-lg md:text-2xl bg-gray-200 w-full text-center md:w-3/4 self-center text-gray-600'>{excerpt}</h3>
      <h2 className="relative text-lg md:text-2xl bg-gray-200 w-full text-center md:w-3/4 self-center text-gray-600">
        {description}
      </h2>
  
    </div>
  );
};
const Page = () => {
  return (
    <>
    <div className=" text-4xl md:text-4xl lg:text-6xl text-800 pt-9 font-bold flex justify-center text-center">
        {`What's Next?`}
      </div>
      <div className="flex justify-center py-10">
          <p className="text-800 text-xl px-11 md:px-22 lg:px-64 text-center font-medium">
         {` Congratulations! You have decided to dedicate your life to following Jesus. You may be wondering what's
           next on your journey. We want to help! Join us as we guide you toward the next steps in your walk with Christ.`}
           </p>
        </div>
        <h3 className="text-2xl flex justify-center text-center md:text-3xl font-bold text-900">{`What does it mean to follow Christ?`}</h3>
        <div className="py-7 px-7 md:px-14 justify-center md:w-full flex flex-col gap-x-4 gap-y-8 flex-wrap">
        <Card 
            image="https://images.unsplash.com/photo-1437603568260-1950d3ca6eab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            excerpt=""
            title=""
            subtitle="Come boldly believer for despite the whisperings of satan and the doubting of your own heart, you are greatly loved ~ch. spurgeon"

          />
          </div>
        <TextComponent
          title="1. Recognize your need of help"
          excerpt=''
          description={`The Bible describes the human condition like this: ” ‘There is no one righteous, not even one; there is no one who understands, no one who seeks God. All have turned away, hey have together become worthless; there is no one who does good, lot even one.’… For all have sinned and fall short of the glory of God” Romans 3:10-12, 23).

          The sin problem is universal. No one is exempt. Every man, woman, boy, and girl is infected with the sin virus—a virus that is 100 percent lethal. “For the wages of sin is death” (Romans 6:23). The first step toward salvation from this desperate situation is to recognize that you are a sinner and that it is impossible for you, in your own strength, to resist the power of evil or to save yourself from its fatal results.`}
           
        />
        <TextComponent
          title="2. Understand that God loves you and wants to save you"
          excerpt=''
          description={`Many people have grown up with the idea that God is some sort of cosmic cop waiting to catch them in sin so He can condemn them to the horrors of hell. Nothing could be further from the truth. God is “‘compassionate and gracious . . . ,slow to anger, abounding in love and faithfulness, maintaining love to thousands, and forgiving wickedness, rebellion and sin'” (Exodus 34:6, 7).

          God does not want to punish us. Instead, ” ‘God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life. For God did not send his Son into the world to condemn the world, but to save the world through him'” (John 3:16, 17). It’s true that God hates sin. Why wouldn’t He? Sin is a killer. It separates us from God, cutting us off from the Source of life. He hates sin, but He loves sinners—you and me.
          
          Because He is also a God of justice, He must punish sin.It is here that the glory of the salva tion plan becomes clear.`}
           
        />
        <TextComponent
          title="3. Look to Jesus"
          excerpt=''
          description={`Just as I needed a savior that day in the swimming pool, we humans needed Someone to save us from drowning in sin. That Savior came in the person of the God-Man Jesus Christ. Jesus came to reveal the love of the Father and to be our Sin Bearer. He bore the punishment for our sins upon the cross. “Surely he took up our infirmities and carried our sorrows. . . . He was pierced for our transgressions, he was crushed for our iniquities; the punishment that brought us peace was upon him, and by his wounds we are healed” (Isaiah 53:4, 5). One of my favorite devotional writers put it this way:

          Ellen White wrote, “Christ was treated as we deserve, that we might be treated as He deserves. He was condemned for our sins, in which He had no share, that we might be justified by His righteousness, in which we had no share. He suffered the death which was ours, that we might receive the life which was His.”`}
           
        />
        <TextComponent
          title="4.Believe"
          excerpt=''
          description={`As you look at Jesus dying on i lie cross and realize that He suffered that agony so you could be saved, you begin to understand the ugliness of sin and want to be forgiven, cleansed, and set free. You confess your wretchedness to God, and you repent. In other words, you turn away from those things that separate you from Him. As you do this, you accept God’s promise to “forgive us our sins and purify us from all unrighteousness” (1 John 1:9).

          You cannot atone for your past sins; you cannot change your heart and make yourself holy. But God promises to do all this for you through Christ. You believe that promise. You confess your sins and give yourself to God. You choose to serve Him. Just as surely as you ilo this, God will fulfill His word in you. You believe the promise— believe that you are forgiven and cleansed—and God supplies the fact. You are made whole, just as Christ gave the paralytic power to walk when the man believed that he was healed. It is so if you believe it. The criterion for salvation hasn’t changed. ” ‘Believe in the Lord Jesus, .11 id you will be saved'” (Acts 16:31).`}
           
        />
        <TextComponent
          title="5.Receive the Gift of Eternal Life"
          excerpt=''
          description={`The sick person has to receive the pills into his or her body in order to be cured. Trust Christ alone to save you. Neither good works nor being religious can save you. “It is by grace you have been saved, through faith—and this not from yourselves, it is the gift of God” (Ephesians 2:8). Christ and Christ alone can atone for your sins and make you clean before God. Go to Him in prayer right now, and tell Him that you are ready to receive His perfect life in place of your sinful one. Confess your sins and claim the promise that “to all who received him, to those who believed in his name, he gave the right to become children of God.” “And this is the testimony: God has given us eternal life, and this life is in his Son. He who has the Son has life” (John 1:12; 1 John 5:11, 12).`}
           
        />
        <div className=" bg-gray-100">
        <div className=" bg-gray-100 text-xl md:text-2xl lg:text-4xl text-800 pt-9 font-bold flex justify-center text-center">
       {`Follow Christ's example`}
      </div>
      <div className="flex justify-center py-10">
          <p className="text-800 text-xl px-11 md:px-22 lg:px-64 text-center font-medium">
          {`Do not let the word depart and close thine eyes against that light poor sinner harden not your heart be saved today.`}
           </p>
        </div>
        <div className="center flex mx-2 justify-center items-center">
          <PrimaryButton
          link="/contact-us"
          text=" I Want to be Baptised"
          />
        </div>
        </div>
        <h3 className="text-2xl p-6 flex justify-center text-center md:text-3xl font-bold text-900">What do followers of christ believe?</h3>
        <div className="flex justify-center py-10">
          <p className="text-800 text-xl px-11 md:px-22 lg:px-64 text-center font-medium">
          {`Seventh-day Adventists accept the Bible as their only creed and hold certain fundamental beliefs to be the teaching of the Holy Scriptures. These beliefs, as set forth here, constitute the church’s understanding and expression of the teaching of Scripture. `}
          </p>
        </div>

        <div className="center flex justify-center">
        <PrimaryButton
          link="/who-we-are/our-beliefs"
          text=" Learn about our beliefs"
          />
        </div>
          <h3 className="text-2xl p-6 flex justify-center text-center md:text-3xl font-bold text-900">{`How do i grow my faith?`}</h3>
        <div className="flex justify-center py-10">
          <p className="text-800 text-xl px-11 md:px-22 lg:px-64 text-center font-medium">
          {`God wants to have a relationship with us and He’s given us ways to know Him better. As we get to know God, we better understand His plan for us and we can strive to be more like Jesus.`} 
          </p>
        </div>
        <TextComponent
          title="Read the bible"
          excerpt='The Bible is the supreme source of truth for Christian beliefs about living. It’s God’s Word written specifically to guide us through life. Download the Bible App and find a Bible reading plan to help you make the Bible part of your everyday life.'
          description={`Your word is a lamp to guide my feet and a light for my path. Psalms 119:105. Don’t worry about anything; instead, pray about everything. Tell God what you need, and thank him for all he has done. Philippians 4:6`}
          
        />
        <div className="center flex mx-2 justify-center items-center">
          <PrimaryButton
          link="https://play.google.com/store/apps/details?id=com.offline.bible"
          text=" Download the bible"
          />
        </div>
        <TextComponent
          title="Listen to the word of God with unwaivering faith."
          excerpt='Talking to God isn’t a one-way street – He wants to talk to us, too. Take time to learn His voice and listen to His direction for you.'
          description={`My sheep listen to my voice; I know them, and they follow me. John 10:27`}
          
        />
        <TextComponent
          title="Worship God"
          excerpt='Any time we give God credit for His goodness, we are worshipping Him. When we pray, serve, or help others in their faith, we are following God’s will and showing our gratitude for who He is.'
          description={`Honor the lord for the glory of his name. Worship the lord in the splendor of his holiness. Psalms 29:2`}
          
        />
         <h3 className="text-2xl p-6 flex justify-center text-center md:text-3xl font-bold text-900">After all these, what next?</h3>
        <div className="flex justify-center py-10">
          <p className="text-800 text-xl px-11 md:px-22 lg:px-64 text-center font-medium">
          {`Just like any other relationship, we need to invest time and effort into getting to know who God is and what He wants for us. `}
          </p>
        </div>
        <TextComponent
          title="Connect"
          excerpt='Life is better together. When we interact with other followers of Christ we find support and encouragement to continue in our faith.'
          description={` Hebrews 10 :23Let us hold unswervingly to the hope we profess, for he who promised is faithful. 24And let us consider how we may spur one another on toward love and good deeds, 25not giving up meeting together, as some are in the habit of doing, but encouraging one another—and all the more as you see the Day approaching.`}
          
        />
        <div className="center flex mx-2 justify-center items-center">
          <PrimaryButton
          link="https://www.google.com/maps/place/S.D.A.+Church,+Karen+Community/@-1.3728886,36.7611987,15z/data=!4m6!3m5!1s0x182f05fb8f8c8c43:0x374cb87546ea813b!8m2!3d-1.3728886!4d36.7611987!16s%2Fg%2F11h57xrn9q"
          text=" Join us at Mukoma "
          />
        </div>
        <TextComponent
          title="Share the Good news"
          excerpt='When you experience something as good as God’s love, you want to share it with the people in your life! Talk about how God has changed your life, build relationships, and invite someone to come to church with you.'
          description={`Therefore, go and make disciples of all the nations, baptizing them in the name of the Father and the Son and the Holy Spirit. Matthew 28:19 `}
          
        />
        <div className="center flex mx-2 justify-center items-center">
          <PrimaryButton
          link="/auth/signup"
          text=" Sign up to serve "
          />
          </div>
          <div className=" bg-gray-100 my-4">
        <div className=" bg-gray-100 text-xl md:text-2xl lg:text-4xl text-800 pt-9 font-bold flex justify-center text-center">
        Connect with our team
      </div>
      <div className='flex flex-row flex-wrap align-center justify-center my-4 py-8'>
        <div className="center flex mx-2 justify-center items-center">
          <PrimaryButton
          link=""
          text="Ask a question "
          />
          </div>
        <div className="center flex mx-2 justify-center items-center">
          <PrimaryButton
          link="/groups/search"
          text="Ask for prayer"
          />
          </div>
          </div>
        </div>
        </>
  )
}

export default Page
