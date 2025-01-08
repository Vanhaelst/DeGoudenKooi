import React from "react";
import { fetchData } from "@/utils/fetchData";
import { Container } from "@/components/atoms";
import { Title } from "@/components/molecules";
import { getBackgroundColor } from "@/utils/getBackgroundColor";
import { TeamMember } from "@/components/molecules/team/teamMember";
import { imageQuery } from "@/queries/entries/image";

async function getTeam() {
  return fetchData(`
    query MyQuery {
      team: teamMembersFieldEntries {
        ... on teamMember_Entry {
          id
          name: title
          position
          role
          image ${imageQuery}
        }
      }
    }
`);
}

export const Team = async ({ title, description, backgroundColor }) => {
  const bgColor = getBackgroundColor(backgroundColor);

  const { team } = await getTeam();

  return (
    <section className={`${bgColor} py-24 sm:py-32`}>
      <Container classnames="mb-24">
        <Title title={title} description={description} />
      </Container>
      <Container classnames="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {team?.map((member, index) => {
          return <TeamMember key={member.title} index={index} {...member} />;
        })}
      </Container>
    </section>
  );
};
