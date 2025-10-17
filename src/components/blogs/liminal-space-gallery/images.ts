export interface LiminalImage {
  src: string;
  alt: string;
  link?: string;
  description?: string;
  origin: "discord" | "pinterest" | "reddit";
}

const discordImages: LiminalImage[] = [
  {
    src: "/images/blog/liminal-space-gallery/discord/PXL_20250828_143858223.webp",
    alt: "Liminal image",
    origin: "discord",
  },
  {
    src: "/images/blog/liminal-space-gallery/discord/IMG_0670.webp",
    alt: "Liminal image",
    origin: "discord",
  },
  {
    src: "/images/blog/liminal-space-gallery/discord/IMG_6476.webp",
    alt: "Liminal image",
    origin: "discord",
  },
  {
    src: "/images/blog/liminal-space-gallery/discord/IMG_0681.webp",
    alt: "Liminal image",
    origin: "discord",
  },
  {
    src: "/images/blog/liminal-space-gallery/discord/20250914_195718.webp",
    alt: "Liminal image",
    origin: "discord",
  },
  {
    src: "/images/blog/liminal-space-gallery/discord/PXL_20250913_020647301.webp",
    alt: "Liminal image",
    origin: "discord",
  },
  {
    src: "/images/blog/liminal-space-gallery/discord/IMG_3135.webp",
    alt: "Liminal image",
    origin: "discord",
  },
  {
    src: "/images/blog/liminal-space-gallery/discord/20250812_161640.webp",
    alt: "Liminal image",
    origin: "discord",
  },
  {
    src: "/images/blog/liminal-space-gallery/discord/PXL_20251006_020127384.webp",
    alt: "Liminal image",
    origin: "discord",
  },
  {
    src: "/images/blog/liminal-space-gallery/discord/IMG_6869.webp",
    alt: "Liminal image",
    origin: "discord",
  },
  {
    src: "/images/blog/liminal-space-gallery/discord/PXL_20250927_014541332.webp",
    alt: "Liminal image",
    origin: "discord",
  },
];

const redditImages: LiminalImage[] = [
  {
    src: "/images/blog/liminal-space-gallery/reddit/edge-of-suburbia-v0-rw37nrn9i63e1.webp",
    alt: "Edge of suburbia",
    link: "https://www.reddit.com/r/LiminalSpace/comments/1h045rb/edge_of_suburbia/",
    origin: "reddit",
  },
  {
    src: "/images/blog/liminal-space-gallery/reddit/this-picture-of-moment-valley-always-felt-liminal-v0-d7jnuvi32wy81.webp",
    alt: "Monument valley",
    link: "https://www.reddit.com/r/LiminalSpace/comments/ung9l6/this_picture_of_moment_valley_always_felt_liminal/",
    origin: "reddit",
  },
  {
    src: "/images/blog/liminal-space-gallery/reddit/bliss.webp",
    alt: "Bliss",
    link: "https://www.reddit.com/r/LiminalSpace/comments/mts3l2/bliss/",
    origin: "reddit",
  },
  {
    src: "/images/blog/liminal-space-gallery/reddit/cqss7zbl15761.webp",
    alt: "Hiroshi Nagai",
    link: "https://www.reddit.com/r/LiminalSpace/comments/kjfk92/hiroshi_nagais_artwork_doesnt_disappoint/",
    origin: "reddit",
  },
  {
    src: "/images/blog/liminal-space-gallery/reddit/a-quiet-communion-with-the-hills-and-open-sky-v0-ubqxv30gteqe1.webp",
    alt: "Quiet communion",
    link: "https://www.reddit.com/r/LiminalSpace/comments/1jhvltk/a_quiet_communion_with_the_hills_and_open_sky/",
    origin: "reddit",
  },
  {
    src: "/images/blog/liminal-space-gallery/reddit/that-very-house-between-reality-and-sleep-v0-gkuvz8bdw8te1.webp",
    alt: "Between reality and sleep",
    link: "https://www.reddit.com/r/LiminalSpace/comments/1jsypxs/that_very_house_between_reality_and_sleep/",
    origin: "reddit",
  },
  {
    src: "/images/blog/liminal-space-gallery/reddit/reminds-me-of-the-truman-show-v0-ktcteut5nxvd1.webp",
    alt: "Reminds me of the Truman Show",
    link: "https://www.reddit.com/r/LiminalSpace/comments/1g81ra1/reminds_me_of_the_truman_show/",
    origin: "reddit",
  },
  {
    src: "/images/blog/liminal-space-gallery/reddit/82fe2rmnpap61.webp",
    alt: "My grandmother's basement",
    link: "https://www.reddit.com/r/LiminalSpace/comments/mdg5jd/my_grandmothers_basement/",
    origin: "reddit",
  },
  {
    src: "/images/blog/liminal-space-gallery/reddit/running-track-at-my-local-gym-v0-5bj1wea029qd1.webp",
    alt: "Running track at my local gym",
    link: "https://www.reddit.com/r/LiminalSpace/comments/1fmg70d/running_track_at_my_local_gym/",
    origin: "reddit",
  },
  {
    src: "/images/blog/liminal-space-gallery/reddit/2ueq4oikkiu91.webp",
    alt: "Brent Wong painting",
    link: "https://www.reddit.com/r/LiminalSpace/comments/y6zqmm/australian_artist_brent_wong_and_his_paintings/",
    origin: "reddit",
  },
  {
    src: "/images/blog/liminal-space-gallery/reddit/3-am-walk-v0-7tndok4mo8pd1.webp",
    alt: "3 AM walk",
    link: "https://www.reddit.com/r/LiminalSpace/comments/1figjkr/3_am_walk/",
    origin: "reddit",
  },
  {
    src: "/images/blog/liminal-space-gallery/reddit/kkc447x4fzy61.webp",
    alt: "Liminal image",
    link: "https://www.reddit.com/r/LiminalSpace/comments/nbw2tu/credit_918_on_facebook_perhaps_my_favorite/",
    origin: "reddit",
  },
  {
    src: "/images/blog/liminal-space-gallery/reddit/i-took-this-picture-on-a-road-trip-recently-v0-vk6qlpp9a4od1.webp",
    alt: "Road trip picture",
    link: "https://www.reddit.com/r/LiminalSpace/comments/1fe2tz0/i_took_this_picture_on_a_road_trip_recently/",
    origin: "reddit",
  },
  {
    src: "/images/blog/liminal-space-gallery/reddit/take-a-seat-and-watch-v0-skm6fklb1xqd1.webp",
    alt: "Take a seat and watch",
    link: "https://www.reddit.com/r/LiminalSpace/comments/1fozj7l/take_a_seat_and_watch/",
    origin: "reddit",
  },
  {
    src: "/images/blog/liminal-space-gallery/reddit/i-have-to-go-home-v0-v6y2t4pc6tfe1.webp",
    alt: "I have to go home",
    link: "https://www.reddit.com/r/LiminalSpace/comments/1icdwwf/i_have_to_go_home/",
    origin: "reddit",
  },
  {
    src: "/images/blog/liminal-space-gallery/reddit/developed-a-roll-of-film-my-dad-shot-in-the-2000s-and-this-v0-5flpx2x2f5ye1.webp",
    alt: "Film from the 2000s",
    link: "https://www.reddit.com/r/LiminalSpace/comments/1kc5nkz/developed_a_roll_of_film_my_dad_shot_in_the_2000s/",
    origin: "reddit",
  },
  {
    src: "/images/blog/liminal-space-gallery/reddit/vw3lfsiox1r91.webp",
    alt: "3D render",
    link: "https://www.reddit.com/r/LiminalSpace/comments/xsb3p8/someone_told_me_to_upload_my_3d_render_here_enjoy/",
    origin: "reddit",
  },
  {
    src: "/images/blog/liminal-space-gallery/reddit/frozen-in-time-nowhere-to-go-v0-8pjf82engbje1.webp",
    alt: "Frozen in time, nowhere to go",
    link: "https://www.reddit.com/r/LiminalSpace/comments/1iq2zj1/frozen_in_time_nowhere_to_go/",
    origin: "reddit",
  },
  {
    src: "/images/blog/liminal-space-gallery/reddit/hilytxpg94a71.webp",
    alt: "Liminal art",
    link: "https://www.reddit.com/r/LiminalSpace/comments/ogoam1/someone_told_me_to_put_up_my_art_here_hope_you/",
    origin: "reddit",
  },
  {
    src: "/images/blog/liminal-space-gallery/reddit/feels-like-a-dream-ive-had-v0-4sfwi5tnf46a1.webp",
    alt: "Feels like a dream I've had",
    link: "https://www.reddit.com/r/LiminalSpace/comments/zmv3yp/feels_like_a_dream_ive_had/",
    origin: "reddit",
  },
  {
    src: "/images/blog/liminal-space-gallery/reddit/a-sunny-summer-day-v0-35mc7gy6432e1.webp",
    alt: "A sunny summer day",
    link: "https://www.reddit.com/r/LiminalSpace/comments/1gvtpjn/a_sunny_summer_day/",
    origin: "reddit",
  },
  {
    src: "/images/blog/liminal-space-gallery/reddit/something-i-found-on-instagram-v0-6elovdv1tyq81.webp",
    alt: "Liminal image",
    link: "https://www.reddit.com/r/LiminalSpace/comments/ttykrz/something_i_found_on_instagram/",
    origin: "reddit",
  },
  {
    src: "/images/blog/liminal-space-gallery/reddit/jmEwtylh1yFS48J5pQ1cwh0FDuMLKtzRxb9KffncrDI.webp",
    alt: "Workspace",
    link: "https://www.reddit.com/r/LiminalSpace/comments/rj51o8/workspace/",
    origin: "reddit",
  },
  {
    src: "/images/blog/liminal-space-gallery/reddit/tears-falling-down-at-the-party-v0-rss4j6chqcsf1.webp",
    alt: "Tears falling down at the party",
    link: "https://www.reddit.com/r/LiminalSpace/comments/1numckq/tears_falling_down_at_the_party/",
    origin: "reddit",
  },
  {
    src: "/images/blog/liminal-space-gallery/reddit/expect-clouds-v0-md9oagz284pf1.webp",
    alt: "Expect clouds",
    link: "https://www.reddit.com/r/LiminalSpace/comments/1ngotkk/expect_clouds/",
    origin: "reddit",
  },
  {
    src: "/images/blog/liminal-space-gallery/reddit/why-do-we-love-liminality-v0-22si2choictf1.webp",
    alt: "Why do we love liminality",
    link: "https://www.reddit.com/r/LiminalSpace/comments/1nyxs21/why_do_we_love_liminality/",
    origin: "reddit",
  },
  {
    src: "/images/blog/liminal-space-gallery/reddit/snowy-scene.jpeg",
    alt: "Snowy scene",
    link: "https://www.reddit.com/r/beirutband/comments/1fy9sr4/what_beirut_song_would_you_listen_to_if_you_sat/#:~:text=What%20Beirut*%20song%20would%20you%20listen%20to,you%20sat%20on%20this%20bench?%20:%20r/beirutband.",
    origin: "reddit",
  },
  {
    src: "/images/blog/liminal-space-gallery/reddit/an-office-cube-at-the-end-of-the-meadow-v0-tedw3tv0diud1.webp",
    alt: "Office cube at the end of the meadow",
    link: "https://www.reddit.com/r/LiminalSpace/comments/1g2ni0d/an_office_cube_at_the_end_of_the_meadow/",
    origin: "reddit",
  },
];

export const images: LiminalImage[] = [...redditImages, ...discordImages];
// an-office-cube-at-the-end-of-the-meadow-v0-tedw3tv0diud1
