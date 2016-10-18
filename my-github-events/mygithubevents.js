function process_events_list(events_list) {
  var return_events = [];
  for (event_index in events_list) {
    e = events_list[event_index];
    /* Process events from the events list, add details
     * about the contained event(s) to the output table.
     */
    var event_type;
    var repo_name = e["repo"]["name"];  // Note that this includes the handle
    var repo_url = "https://github.com/" + repo_name;
    var timestamp = e["created_at"];

    switch (e["type"]) {
      case "PushEvent":
        // e.g. "sha": "21ee3e6ef8eb853fb8434941ed6378c5b35e3312"
        event_type = "pushed commit";
        var commits = e["payload"]["commits"];
        for (commit_index in commits) {
          var commit_message = commits[commit_index]["message"];
          var commit_hash = commits[commit_index]["sha"];
          var commit_html_url = repo_url + "/commit/" + commit_hash;
          return_events.push([event_type, timestamp, commit_message, commit_html_url]);
        }
        break;

      case "IssuesEvent":
        // e.g. "id": "4698115415"
        event_type = e["payload"]["action"] + " issue";
        var issue_details = e["payload"]["issue"];
        var issue_html_url = repo_url + "/issues/" + issue_details["number"];
        var issue_title = issue_details["title"];
        return_events.push([event_type, timestamp, issue_title, issue_html_url]);
        break;

      case "IssueCommentEvent":
        // e.g. "id": "4712038499"
        event_type = "commented on issue";
        var issue_title = e["payload"]["issue"]["title"];
        var comment = e["payload"]["comment"];
        // This has a more up-to-date sub-timestamp
        timestamp = comment["created_at"];
        var comment_html_url = comment["html_url"];
        var comment_body = comment["body"];
        return_events.push([event_type, timestamp, issue_title + " --- " + comment_body, comment_html_url]);
        break;

      case "PullRequestEvent":
        // e.g. "id": "4712038505"
        event_type = e["payload"]["action"] + " PR";
        var pr = e["payload"]["pull_request"];
        return_events.push([event_type, pr["closed_at"], pr["title"], pr["html_url"]]);
        break;

      case "PullRequestReviewCommentEvent":
        // e.g. "id": "4698323066"
        event_type = "commented on PR";
        var comment = e["payload"]["comment"];
        var comment_body = comment["body"];
        var comment_html_url = comment["html_url"];
        // This has a more up-to-date sub-timestamp
        timestamp = comment["updated_at"];
        var pr = e["payload"]["pull_request"];
        var pr_title = pr["title"];
        return_events.push([event_type, timestamp, pr_title + " --- " + comment_body, comment_html_url]);
        break;

      default:
        // CreateEvent, DeleteEvent, ForkEvent
        console.log("Yet-unhandled type " + e["type"]);
        return_events.push([e["type"], "ID " + e["id"], "???", "???"]);
      }
  }

  for (event_index in return_events) {
    add_to_output_table(return_events[event_index]);
  }
}


function add_to_output_table(e) {
  var event_type = e[0];
  var timestamp = e[1];
  var message = e[2];
  var url= e[3];
  var S = "</td><td>";
  $("#eventslist").append("<tr><td>" + event_type + S + timestamp + S +
      message + S + '<a href="' + url + '">' + url + "</a></td></tr>\n");
}



function doSubmit() {
  // Get the GitHub handle from the form
  var github_handle = document.handle_submit_form.github_handle.value;
  var events_page = document.handle_submit_form.events_page.value;
  // Get the JSON events data and have it processed
  var events_url = "https://api.github.com/users/" + github_handle + "/events";
  if (events_page != "") {
    events_url += "?page=" + events_page;
  }
  jQuery.getJSON(events_url, process_events_list);

  // Don't reload the page when the control flow leaves this function
  return false;
}
