interface ITour {
  id: number;
  title: string;
  duration: number;
  cost: number;
  location: string;
  featured: boolean;
  type: string;
  thumb: string;
  image: string[];
  overview: {
    description: string;
    highlight: string[];
  };
  include: string[];
  departure: {
    point: string[];
    time: string;
  };
  itinerary: {
    title: string;
    details: {
      location: string;
      description: string;
      duration: string;
      other: string;
    }[];
  }[];
  additional: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
  rating: {
    title: string;
    rate: number;
    heading: string;
    time: number;
    comments: string;
    avatar: string;
  }[];
}

export default ITour;
