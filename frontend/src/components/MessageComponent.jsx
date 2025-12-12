import React from "react";

const MessageComponent = ({ isSent }) => {
  if (isSent) {
    return (
      <div className="flex flex-col w-full mt-3 items-end  ">
        <p className="text-sm md:text-lg bg-indigo-500 text-white p-3 rounded-xl w-fit  max-w-[70%] sm:max-w-[60%]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt fugiat adipisci illum. Fuga molestiae quas error esse vero itaque quos dignissimos? Excepturi ipsum beatae voluptates accusamus, quaerat incidunt praesentium corporis!
          Magni sed recusandae magnam reprehenderit delectus ipsa et ratione obcaecati? Fugit aspernatur maiores natus maxime iste! Voluptate repellendus illum ut nisi sunt, illo, nulla cupiditate dolorum sapiente doloribus, mollitia nam?
          Quibusdam debitis, pariatur a quisquam eaque nihil modi earum saepe tempore quas officia doloribus. Accusamus, voluptatibus voluptate totam quibusdam deleniti, architecto obcaecati molestiae maiores velit ex iusto laboriosam, perspiciatis ipsa?
          Numquam, in accusantium beatae ab temporibus facere vel optio? Tempore nesciunt expedita nam dignissimos eveniet id dolorem facere quisquam distinctio ipsum inventore odio cumque eius labore, eum quis consequuntur natus.
          Alias eos ab dolores nobis impedit modi eius dignissimos deleniti, saepe ratione tenetur nam veritatis voluptates expedita, commodi doloremque facere labore delectus, cum deserunt libero ipsam. Vero magni quasi recusandae.
        </p>
        <p className="text-sm md:text-lg px-2 mt-1 text-slate-600">2:24pm</p>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col w-full mt-3 ">
        <p className="text-slate-600 px-2 text-sm md:text-lg max-w-[40%] w-fit">
          Your Name
        </p>
        <p className="text-sm md:text-lg p-3 mt-1 bg-white rounded-xl w-fit max-w-[60%] ">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur enim laudantium animi voluptatem, corrupti earum vitae accusamus expedita velit quis, quidem ipsa ipsum voluptas sunt, soluta necessitatibus eius repellendus fugiat?
          Eligendi quibusdam modi excepturi maiores sunt est aperiam distinctio alias fugit similique optio ea aspernatur nisi consequatur laboriosam laudantium assumenda, sapiente illo exercitationem corporis! Adipisci quasi exercitationem assumenda sint atque!
          Perferendis hic voluptatum ullam ab molestiae cupiditate ad praesentium consequatur eveniet? Et quia doloremque unde debitis nobis tenetur maxime laboriosam neque, quasi eos ab numquam, nisi, nulla tempore dolores consectetur?
          Perspiciatis cum consequatur nulla, aspernatur tempora dolores dolor aut illum sint ducimus tenetur veritatis ab fugiat molestias similique quo. Asperiores, omnis sequi incidunt in consequatur similique architecto numquam! Ipsa, harum.
          Fugiat ducimus earum nam iusto debitis, laboriosam beatae repellat maxime minus soluta! Ab animi commodi eaque similique, ullam officia qui molestias consequatur quas illum ea labore, alias impedit veniam deleniti?
        </p>
        <p className="text-sm md:text-lg px-2 mt-1 text-slate-600">2:24pm</p>
      </div>
    );
  }
};

export default MessageComponent;
