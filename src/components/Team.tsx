
// Icons temporarily removed to fix import issues

const team = [
  {
    name: 'Sarah Johnson',
    role: 'CEO & Founder',
    image: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=8B5CF6&color=fff&size=300',
    bio: '10+ years in digital strategy with expertise in scaling tech companies.',
    social: {
      linkedin: '#',
      twitter: '#'
    }
  },
  {
    name: 'Alex Chen',
    role: 'Lead Developer',
    image: 'https://ui-avatars.com/api/?name=Alex+Chen&background=3B82F6&color=fff&size=300',
    bio: 'Full-stack developer passionate about creating scalable web applications.',
    social: {
      linkedin: '#',
      github: '#'
    }
  },
  {
    name: 'Maya Patel',
    role: 'Design Director',
    image: 'https://ui-avatars.com/api/?name=Maya+Patel&background=F59E0B&color=fff&size=300',
    bio: 'Award-winning designer with a focus on user experience and brand identity.',
    social: {
      linkedin: '#',
      twitter: '#'
    }
  },
  {
    name: 'David Rodriguez',
    role: 'Marketing Strategist',
    image: 'https://ui-avatars.com/api/?name=David+Rodriguez&background=10B981&color=fff&size=300',
    bio: 'Digital marketing expert helping brands achieve measurable growth.',
    social: {
      linkedin: '#',
      twitter: '#'
    }
  }
];

const Team = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Meet Our Team
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Passionate professionals dedicated to bringing your digital vision to life.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300">
              <div className="relative overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-purple-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm mb-4">{member.bio}</p>

                <div className="flex space-x-3">
                  {member.social.linkedin && (
                    <a href={member.social.linkedin} className="text-gray-400 hover:text-blue-600 transition-colors text-sm">
                      LinkedIn
                    </a>
                  )}
                  {member.social.twitter && (
                    <a href={member.social.twitter} className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                      Twitter
                    </a>
                  )}
                  {member.social.github && (
                    <a href={member.social.github} className="text-gray-400 hover:text-gray-900 transition-colors text-sm">
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
