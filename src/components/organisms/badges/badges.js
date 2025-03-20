import { Badge } from "@/components/organisms/badges/badge";

export const Badges = ({ rooms, searchParams, dict }) => {
  return (
    <div className="badges w-full flex justify-center mt-12">
      <div className="flex overflow-x-scroll space-x-5 hide-scrollbar px-10">
        {rooms?.map((room, index) => (
          <Badge
            key={room.title}
            searchParams={searchParams}
            dict={dict}
            index={index}
            length={rooms.length}
            {...room}
          />
        ))}
      </div>
    </div>
  );
};
