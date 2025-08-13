"use client"

import { useEffect, useState } from "react"
import {
  getEpisodeDetails,
  getAnimeDetails,
  getImageUrl,
  type TmdbEpisode,
  type TmdbTvShow,
  getSeasonDetails,
  type TmdbSeasonDetails,
} from "@/lib/tmdb"
import { getEpisodeVideoUrl } from "@/lib/anime-api"
import { Button } from "@/components/ui/button"
import { SkipForward, SkipBack, ChevronLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { ShareButton } from "@/components/share-button"
import { BackButton } from "@/components/back-button"
import { ReportButton } from "@/components/report-button"
import { notFound } from "next/navigation"
import { ALL_AVAILABLE_ANIME_TMDB_IDS } from "@/lib/anime-mapping"

interface VideoPlayerPageProps {
  params: {
    id: string
    seasonNumber: string
    episodeNumber: string
  }
}

export default function VideoPlayerPage({ params }: VideoPlayerPageProps) {
  const animeId = Number.parseInt(params.id)
  const seasonNumber = Number.parseInt(params.seasonNumber)
  const episodeNumber = Number.parseInt(params.episodeNumber)

  const [anime, setAnime] = useState<TmdbTvShow | null>(null)
  const [episode, setEpisode] = useState<TmdbEpisode | null>(null)
  const [currentSeasonEpisodes, setCurrentSeasonEpisodes] = useState<TmdbEpisode[]>([])
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [isLoadingVideo, setIsLoadingVideo] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    const fetchAnimeAndEpisode = async () => {
      // Check if the anime ID is in the list of available anime
      if (!ALL_AVAILABLE_ANIME_TMDB_IDS.includes(animeId)) {
        setNotFound(true)
        return
      }
      
      const fetchedAnime = await getAnimeDetails(animeId)
      setAnime(fetchedAnime)

      const fetchedEpisode = await getEpisodeDetails(animeId, seasonNumber, episodeNumber)
      if (!fetchedEpisode) {
        setNotFound(true)
        return
      }
      setEpisode(fetchedEpisode)

      const fetchedSeasonDetails: TmdbSeasonDetails | null = await getSeasonDetails(animeId, seasonNumber)
      setCurrentSeasonEpisodes(fetchedSeasonDetails?.episodes || [])

      setIsLoadingVideo(true)
      const fetchedVideoUrl = await getEpisodeVideoUrl(animeId, seasonNumber, episodeNumber)
      setVideoUrl(fetchedVideoUrl)
      setIsLoadingVideo(false)
    }
    fetchAnimeAndEpisode()
  }, [animeId, seasonNumber, episodeNumber])

  const currentEpisodeTitle = episode?.name || `Episode ${episodeNumber}`
  const currentAnimeTitle = anime?.name || "Loading..."

  const currentEpisodeIndex = currentSeasonEpisodes.findIndex((ep) => ep.episode_number === episodeNumber)
  const prevEpisode = currentEpisodeIndex > 0 ? currentSeasonEpisodes[currentEpisodeIndex - 1] : null
  const nextEpisode =
    currentEpisodeIndex < currentSeasonEpisodes.length - 1 ? currentSeasonEpisodes[currentEpisodeIndex + 1] : null

  const prevEpisodeLink = prevEpisode
    ? `/anime/${animeId}/season/${prevEpisode.season_number}/episode/${prevEpisode.episode_number}`
    : null
  const nextEpisodeLink = nextEpisode
    ? `/anime/${animeId}/season/${nextEpisode.season_number}/episode/${nextEpisode.episode_number}`
    : null

  if (notFound) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-foreground">
        <h1 className="text-3xl font-bold mb-4">Episode Not Found</h1>
        <p className="text-xl mb-6">This episode is not available on our website.</p>
        <Link href="/">
          <Button className="glass-effect">Return to Home</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground anime-player-page">
      <header className="sticky top-0 z-50 glass-effect border-b border-border/20 px-3 sm:px-4 py-2 sm:py-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <BackButton href={`/anime/${animeId}`} />

          <div className="flex-1 min-w-0">
            <h1 className="font-semibold text-sm sm:text-base truncate">{currentEpisodeTitle}</h1>
            <p className="text-xs text-muted-foreground truncate">
              {currentAnimeTitle} • S{seasonNumber}
            </p>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="flex flex-col xl:grid xl:grid-cols-[1fr_380px] xl:gap-6 xl:p-6">
          {/* Video Player Section */}
          <div className="space-y-3 sm:space-y-4">
            <div className="relative w-full overflow-hidden bg-black aspect-video xl:rounded-lg shadow-xl">
              {isLoadingVideo ? (
                <div className="w-full h-full flex items-center justify-center bg-black/50 text-white">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                    <p className="text-sm">Loading video...</p>
                  </div>
                </div>
              ) : videoUrl ? (
                <iframe
                  src={videoUrl}
                  className="w-full h-full border-0"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  title={`${currentAnimeTitle} - ${currentEpisodeTitle}`}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-black/50 text-white text-center p-4">
                  <div>
                    <p className="text-lg mb-2">Video not available</p>
                    <p className="text-sm text-gray-300">This episode is currently unavailable.</p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-2 sm:gap-3 px-3 sm:px-4 xl:px-0">
              {prevEpisodeLink && (
                <Link href={prevEpisodeLink} className="flex-1">
                  <Button className="w-full glass-effect text-xs sm:text-sm h-9 sm:h-10">
                    <SkipBack className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" /> Previous
                  </Button>
                </Link>
              )}
              {nextEpisodeLink && (
                <Link href={nextEpisodeLink} className="flex-1">
                  <Button className="w-full glass-effect text-xs sm:text-sm h-9 sm:h-10">
                    Next <SkipForward className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </Link>
              )}
            </div>

            {/* Episode Info Section */}
            <div className="px-3 sm:px-4 xl:px-0 space-y-3 sm:space-y-4">
              <div>
                <h2 className="text-base sm:text-lg font-bold mb-2">Episode Overview</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {episode?.overview || "No overview available for this episode."}
                </p>
              </div>

              <div className="pt-2 flex gap-2">
                <button onClick={() => {
                  if (typeof window !== "undefined") {
                    navigator.clipboard.writeText(window.location.href);
                    // You would typically show a toast notification here
                  }
                }} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3 gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                  <span>Share</span>
                </button>
                <button onClick={() => {
                  // This would typically open a report dialog
                  console.log('Report clicked');
                }} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3 gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><polygon points="22 2 7 2 2 7 2 22 17 22 22 17 22 2"/><polyline points="11 12 15 16 19 12"/><line x1="15" y1="8" x2="15" y2="16"/></svg>
                  <span>Report</span>
                </button>
              </div>
            </div>
          </div>

          <div className="xl:sticky xl:top-24 xl:h-fit mt-6 xl:mt-0">
            <div className="glass-effect mx-3 sm:mx-4 xl:mx-0 xl:rounded-lg rounded-lg">
              <div className="p-3 sm:p-4 border-b border-border/20">
                <h3 className="font-semibold text-sm sm:text-base">Season {seasonNumber} Episodes</h3>
                <p className="text-xs text-muted-foreground mt-1">{currentSeasonEpisodes.length} episodes available</p>
              </div>

              {currentSeasonEpisodes.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground text-sm">No episodes found for this season.</div>
              ) : (
                <div className="max-h-[50vh] xl:max-h-[calc(100vh-200px)] overflow-y-auto">
                  <div className="divide-y divide-border/10">
                    {currentSeasonEpisodes.map((ep) => {
                      const isActive = ep.episode_number === episodeNumber
                      return (
                        <Link
                          key={`ep-${ep.season_number}-${ep.episode_number}`}
                          href={`/anime/${animeId}/season/${ep.season_number}/episode/${ep.episode_number}`}
                          className={`flex items-start gap-3 p-3 sm:p-4 hover:bg-white/5 transition-colors duration-200 ${
                            isActive ? "bg-primary/10 border-r-2 border-primary" : ""
                          }`}
                        >
                          <div className="flex-shrink-0">
                            <Image
                              src={
                                getImageUrl(ep.still_path, "w300") ||
                                "/placeholder.svg?height=50&width=90&query=episode-thumbnail" ||
                                "/placeholder.svg"
                              }
                              alt={ep.name || `Episode ${ep.episode_number} thumbnail`}
                              width={90}
                              height={50}
                              className="rounded-md object-cover aspect-video"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className={`font-medium text-sm line-clamp-1 ${isActive ? "text-primary" : ""}`}>
                              E{ep.episode_number}: {ep.name || `Episode ${ep.episode_number}`}
                            </div>
                            <div className="text-xs text-muted-foreground line-clamp-2 mt-1 leading-relaxed">
                              {ep.overview || "No description available."}
                            </div>
                            {ep.air_date && (
                              <div className="text-xs text-muted-foreground/70 mt-1">
                                {new Date(ep.air_date).toLocaleDateString()}
                              </div>
                            )}
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
